import { Stream } from '@most/types';
import { Either } from 'fp-ts/lib/Either';
import { Order, OrderAPI, mapOrder } from '../model/orders.model';
import { domain } from '../../../../entry-api';
import { fromPromise } from '@most/core';
import axios from 'axios';
import { either } from 'fp-ts';
import Cookies from 'js-cookie';

export interface OrderService {
    readonly getAll: (
        start: number,
        size: number,
        payed_only?: boolean
    ) => Stream<Either<string, ReadonlyArray<Order>>>;
}

const API = {
    orders: `${domain}/orders`,
};
export const newOrdersService = (): OrderService => ({
    getAll: (start, size, payed_only = false) =>
        fromPromise(
            axios
                .get<ReadonlyArray<OrderAPI>>(
                    `${API.orders}/?start=${start}&size=${size}&payed_only=${payed_only}`,
                    {
                        headers: {
                            Authorization: `Bearer ${Cookies.get(
                                'access_token'
                            )}`,
                        },
                    }
                )
                .then((resp) => either.right(resp.data.map(mapOrder)))
                .catch((error) =>
                    either.left(
                        `Something goes wrong status = ${error.response.status}`
                    )
                )
        ),
});
