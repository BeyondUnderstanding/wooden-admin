import React from 'react';
import { Orders } from './orders.component';
import { newOrdersService } from '../domain/service/orders-rest.service';
import { newOrdersStore } from './orders.view-model';
import { useProperties } from '@frp-ts/react';
import { useValueWithEffect } from '../../../utils/run-view-model.utils';

export const OrdersContainer = () => {
    const service = newOrdersService();
    const store = useValueWithEffect(() => newOrdersStore({ service }), []);

    const Resolve = Orders({ OrderStore: store });

    const [orders, isLoadingExtraOrders] = useProperties(
        store.orders,
        store.isLoadingExtraOrders
    );

    return React.createElement(Resolve, {
        orders,
        isLoadingExtraOrders,
    });
};
