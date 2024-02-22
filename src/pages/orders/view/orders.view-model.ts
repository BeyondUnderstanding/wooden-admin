import { injectable, token } from '@injectable-ts/core';
import {
    ValueWithEffect,
    valueWithEffect,
} from '../../../utils/run-view-model.utils';
import { OrdersService } from '../domain/service/orders-rest.service';
import { Orders } from '../domain/model/orders.model';
import { Property, property } from '@frp-ts/core';
import { newLensedAtom } from '@frp-ts/lens';
import { flow, pipe } from 'fp-ts/lib/function';
import { either } from 'fp-ts';
import { chain, debounce, now, tap } from '@most/core';
import { scroll } from '@most/dom-event';
import { fromProperty } from '../../../utils/property.utils';

export interface OrdersStore {
    readonly orders: Property<ReadonlyArray<Orders>>;
    readonly isLoadingExtraOrders: Property<boolean>;
    readonly setOrders: (x: ReadonlyArray<Orders>) => void;
    readonly setIsLoadingExtraOrders: (x: boolean) => void;
    readonly setOnlyActive: (x: boolean) => void;
    readonly setOnlyPayed: (x: boolean) => void;
}

type NewOrdersStore = ValueWithEffect<OrdersStore>;

export const newOrdersStore = injectable(
    token('service')<OrdersService>(),
    (service): NewOrdersStore => {
        const orders = newLensedAtom<ReadonlyArray<Orders>>([]);
        const onlyActive = newLensedAtom(false);
        const onlyPayed = newLensedAtom(false);

        const isLoadingExtraOrders = newLensedAtom<boolean>(false);

        const initOrdersEffect = pipe(
            service.getAll(0, 20),
            tap(
                flow(
                    either.fold(
                        () => orders.set([]),
                        (ordersResp: ReadonlyArray<Orders>) =>
                            orders.set(ordersResp)
                    )
                )
            )
        );

        let prevScrollPos = window.pageYOffset;
        const scrollEffect = pipe(
            scroll(window),
            debounce(20),
            chain(() => {
                isLoadingExtraOrders.set(true);
                let currentScrollPos = window.pageYOffset;
                if (currentScrollPos > prevScrollPos) {
                    return service.getAll(
                        orders.get().length,
                        10,
                        onlyPayed.get(),
                        onlyActive.get()
                    );
                }
                prevScrollPos = currentScrollPos;
                return now(either.left(''));
            }),
            tap(
                flow(
                    either.fold(
                        () => isLoadingExtraOrders.set(false),
                        (ordersResp: ReadonlyArray<Orders>) => {
                            orders.modify((orders) => [
                                ...new Set([...orders, ...ordersResp]),
                            ]);
                            isLoadingExtraOrders.set(false);
                        }
                    )
                )
            )
        );

        const filtersEffect = pipe(
            property.combine(
                onlyActive,
                onlyPayed,
                (onlyActive, onlyPayed) => ({ onlyActive, onlyPayed })
            ),
            fromProperty,
            tap((_) => isLoadingExtraOrders.set(true)),
            chain(({ onlyActive, onlyPayed }) =>
                service.getAll(0, 20, onlyPayed, onlyActive)
            ),
            tap(
                flow(
                    either.fold(
                        () => isLoadingExtraOrders.set(false),
                        (ordersResp: ReadonlyArray<Orders>) => {
                            orders.set(ordersResp);
                            isLoadingExtraOrders.set(false);
                        }
                    )
                )
            )
        );

        return valueWithEffect.new(
            {
                orders,
                isLoadingExtraOrders,
                setOrders: (x) => orders.set(x),
                setIsLoadingExtraOrders: (x) => isLoadingExtraOrders.set(x),
                setOnlyActive: (x) => onlyActive.set(x),
                setOnlyPayed: (x) => onlyPayed.set(x),
            },
            initOrdersEffect,
            scrollEffect,
            filtersEffect
        );
    }
);
