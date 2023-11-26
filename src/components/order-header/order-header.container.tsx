import { injectable, token } from '@injectable-ts/core';
import { OrderService } from '../../pages/orders/domain/service/orders-rest.service';
import React from 'react';
import { OrderHeader } from './order-header.component';

export const OrderHeaderContainer = injectable(
    token('service')<OrderService>(),
    (service) => () => {
        return React.createElement(OrderHeader);
    }
);
