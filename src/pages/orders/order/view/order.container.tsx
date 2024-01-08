import React from 'react';
import { Order } from './order.component';
import { Order as IOrder, emptyOrder } from '../../domain/model/orders.model';
import { useLoaderData } from 'react-router';
import { Either } from 'fp-ts/lib/Either';
import { either } from 'fp-ts';
import { pipe } from 'fp-ts/lib/function';
import { useValueWithEffect } from '../../../../utils/run-view-model.utils';
import { newOrderStore } from './order.srore';
import { OrdersService} from '../../domain/service/orders-rest.service';
import { useProperty } from '@frp-ts/react';

interface OrderContainerProps {
    service:OrdersService
}

export const OrderContainer = ({service}:OrderContainerProps) => {
    const order = pipe(
        useLoaderData() as Either<string, IOrder>,
        either.fold(emptyOrder, (order) => order)
    );


    const store = useValueWithEffect( 
        () => newOrderStore(service,order),
        []
    );

    const id =useProperty(store.id);

    const OrderResolve = Order({
        store,
    });

    return React.createElement(OrderResolve, { ...order, ...store, id});
};


