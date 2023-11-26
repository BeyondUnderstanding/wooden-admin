import { injectable, token } from '@injectable-ts/core';
import {
    ValueWithEffect,
    valueWithEffect,
} from '../../../utils/run-view-model.utils';
import { OrderService } from '../domain/service/orders-rest.service';
import { Order } from '../domain/model/orders.model';
import { Property } from '@frp-ts/core';
import { newLensedAtom } from '@frp-ts/lens';
import { flow, pipe } from 'fp-ts/lib/function';
import { either } from 'fp-ts';
import { chain, debounce, now, tap } from '@most/core';
import { scroll } from '@most/dom-event';

interface OrdersViewModel {
    readonly orders: Property<ReadonlyArray<Order>>;
    readonly isLoadingExtraOrders: Property<boolean>;
}

type NewOrdersViewModel = ValueWithEffect<OrdersViewModel>;

export const newLoginViewModel = injectable(
    token('service')<OrderService>(),
    (service): NewOrdersViewModel => {
        const orders = newLensedAtom<ReadonlyArray<Order>>([]);

        const isLoadingExtraOrders = newLensedAtom<boolean>(false);

        const initOrdersEffect = pipe(
            service.getAll(0, 20),
            tap(
                flow(
                    either.fold(
                        () => orders.set([]),
                        (ordersResp: ReadonlyArray<Order>) =>
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
                    return service.getAll(orders.get().length, 10);
                }
                prevScrollPos = currentScrollPos;
                return now(either.left(''));
            }),
            tap(
                flow(
                    either.fold(
                        () => isLoadingExtraOrders.set(false),
                        (ordersResp: ReadonlyArray<Order>) => {
                            orders.modify((orders) => [
                                ...new Set([...orders, ...ordersResp]),
                            ]);
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
            },
            initOrdersEffect,
            scrollEffect
        );
    }
);
