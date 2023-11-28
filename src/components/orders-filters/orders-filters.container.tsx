import { injectable, token } from '@injectable-ts/core';
import React from 'react';
import { OrdersFilters } from './orders-filters.component';
import { OrdersStore } from '../../pages/orders/view/orders.view-model';

export const OrdersFiltersContainer = injectable(
    token('OrderStore')<OrdersStore>(),
    (OrderStore) => () => {
        return React.createElement(OrdersFilters, {
            setOnlyActive: OrderStore.setOnlyActive,
            setOnlyPayed: OrderStore.setOnlyPayed,
        });
    }
);
