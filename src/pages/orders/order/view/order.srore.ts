import { Property } from '@frp-ts/core';
import {
    ValueWithEffect,
    valueWithEffect,
} from '../../../../utils/run-view-model.utils';
import { OrdersService } from '../../domain/service/orders-rest.service';
import { newLensedAtom } from '@frp-ts/lens';
import {
    Order,
    OrderAction,
    getOrderPopupTitle,
} from '../../domain/model/orders.model';
import { createAdapter } from '@most/adapter';
import { flow, pipe } from 'fp-ts/lib/function';
import { tap, chain } from '@most/core';
import { either } from 'fp-ts';

export interface OrderStore {
    readonly popupIsOpen: Property<boolean>;
    readonly popupTitle: Property<string>;
    readonly onOpenByAction: (action: OrderAction | null) => void;
    readonly activeAction: Property<OrderAction | null>;
    readonly closePopup: () => void;
    readonly id: Property<number>;
    readonly orderCancel: (needRefund: boolean) => void;
    readonly isOrderPrepayment: (event: string) => void;
    readonly sendMessage: (message: string) => void;
}
export interface NewOrderStore {
    (service: OrdersService, initOrder: Order): ValueWithEffect<OrderStore>;
}

export const newOrderStore: NewOrderStore = (service, initOrder) => {
    const activeAction = newLensedAtom<OrderAction | null>(null);
    const popupIsOpen = newLensedAtom(false);
    const popupTitle = newLensedAtom<string>('');
    const id = newLensedAtom<number>(initOrder.id);
    const [onOpenByAction, onOpenByActionEvent] =
        createAdapter<OrderAction | null>();
    const [orderCancel, orderCancelEvent] = createAdapter<boolean>();
    const [isOrderPrepayment, isOrderPrepaymentEvent] = createAdapter<string>();
    const [sendMessage, sendMessageEvent] = createAdapter<string>();

    const sendMessageEffect = pipe(
        sendMessageEvent,
        chain((message: string) => service.sendMessage(id.get(), message)),
        tap((response) =>
            pipe(
                response,
                either.fold(
                    () => {
                        onOpenByAction('error');
                    },
                    () => {
                        onOpenByAction('send a message done');
                    }
                )
            )
        )
    );
    const isOrderPrepaymenteffect = pipe(
        isOrderPrepaymentEvent,
        chain(() => service.prepayment(id.get())),
        tap((response) =>
            pipe(
                response,
                either.fold(
                    () => {
                        onOpenByAction('error');
                    },
                    () => {
                        onOpenByAction('prepaid done');
                    }
                )
            )
        )
    );

    const cancelOrderEffect = pipe(
        // функция = (нач знач) => {func,func,func...};
        orderCancelEvent,
        chain((needRefund: boolean) =>
            service.cancelOrder(id.get(), needRefund)
        ),
        tap((response) =>
            pipe(
                response,
                either.fold(
                    () => {
                        onOpenByAction('error');
                    },
                    () => {
                        onOpenByAction('cancel done');
                    }
                )
            )
        )
    );

    const actionChangeEvent = pipe(
        onOpenByActionEvent,
        tap((action) => {
            activeAction.set(action);
            popupIsOpen.set(!!action);
            popupTitle.set(getOrderPopupTitle(action));
        })
    );

    return valueWithEffect.new(
        {
            popupIsOpen,
            popupTitle,
            onOpenByAction,
            closePopup: () => onOpenByAction(null),
            orderCancel,
            isOrderPrepayment,
            sendMessage,
            id,
            activeAction,
        },
        actionChangeEvent,
        cancelOrderEffect,
        isOrderPrepaymenteffect,
        sendMessageEffect
    ); // object , streams
};
