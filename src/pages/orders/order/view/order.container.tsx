import React from 'react';
import { Order } from './order.component';
import { Order as IOrder, emptyOrder } from '../../domain/model/orders.model';
import { useLoaderData } from 'react-router';
import { Either } from 'fp-ts/lib/Either';
import { either } from 'fp-ts';
import { pipe } from 'fp-ts/lib/function';

export const OrderContainer = () => {
    const order = pipe(
        useLoaderData() as Either<string, IOrder>,
        either.fold(emptyOrder, (order) => order)
    );

    return React.createElement(Order, { ...order });
};
