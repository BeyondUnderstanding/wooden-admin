import { injectable, token } from '@injectable-ts/core';
import { OrderStore } from '../view/order.srore';
import React from 'react';
import { OrderPopup } from './order-popup.component';
import { useProperty } from '@frp-ts/react';

export const OrderPopupContainer = injectable(
    token('store')<OrderStore>(),
    (store) => () => {
        return React.createElement(OrderPopup, {
            Close: store.ClosePopup,
            Cancel: store.orderCancel,
            action: useProperty(store.activeAction),
            SetPrepayment: store.isOrderPrepayment,
        });
    }
);
