import React from 'react';
import { Orders } from './orders.component';
import { newOrdersService } from '../domain/service/orders-rest.service';
import { newLoginViewModel } from './orders.view-model';
import { useProperties } from '@frp-ts/react';
import { useValueWithEffect } from '../../../utils/run-view-model.utils';

export const OrdersContainer = () => {
    const service = newOrdersService();
    const vm = useValueWithEffect(() => newLoginViewModel({ service }), []);

    const Resolve = Orders({ service });

    const [orders, isLoadingExtraOrders] = useProperties(
        vm.orders,
        vm.isLoadingExtraOrders
    );

    return React.createElement(Resolve, {
        orders,
        isLoadingExtraOrders,
    });
};
