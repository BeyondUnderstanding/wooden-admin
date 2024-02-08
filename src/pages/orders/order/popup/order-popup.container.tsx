import { injectable, token } from '@injectable-ts/core';
import { OrderStore } from '../view/order.srore';
import React from 'react';
import { OrderPopup } from './order-popup.component';
import { useProperty } from '@frp-ts/react';

export const OrderPopupContainer = injectable(
    token('store')<OrderStore>(),
    (store) => () => {
        return React.createElement(OrderPopup, {
            сlosePopup: store.closePopup,
            cancelOrder: store.orderCancel,
            activeAction: useProperty(store.activeAction),
            setPrepayment: store.isOrderPrepayment,
            sendMessage: store.sendMessage,
        });
    }
);
