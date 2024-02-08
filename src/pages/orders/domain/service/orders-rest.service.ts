import { Stream } from '@most/types';
import { Either } from 'fp-ts/lib/Either';
import {
    Orders,
    OrdersAPI,
    mapOrders,
    Order,
    OrderAPI,
    mapOrder,
} from '../model/orders.model';
import { domain } from '../../../../entry-api';
import { fromPromise } from '@most/core';
import axios from 'axios';
import { either } from 'fp-ts';
import Cookies from 'js-cookie';
import { logout } from '../../../../utils/rest.utils';
import { Params } from 'react-router-dom';

interface PrepaymentResponse {
    message: string;
    id: number;
}

export interface OrdersService {
    readonly getAll: (
        start: number,
        size: number,
        payed_only?: boolean,
        active_only?: boolean
    ) => Stream<Either<string, ReadonlyArray<Orders>>>;

    readonly getById: (
        params: Params<string>
    ) => Promise<Either<string, Order>>;

    readonly cancelOrder: (
        id: number,
        needRefund: boolean
    ) => Stream<Either<string, string>>;

    readonly prepayment: (
        id: number
    ) => Stream<Either<string, PrepaymentResponse>>;

    readonly sendMessage: (
        id: number,
        message: string
    ) => Stream<Either<string, string>>;
}

const API = {
    orders: `${domain}/orders`,
};
export const newOrdersService = (): OrdersService => ({
    getAll: (start, size, payed_only = false, active_only = false) =>
        fromPromise(
            axios
                .get<ReadonlyArray<OrdersAPI>>(
                    `${API.orders}/?start=${start}&size=${size}&payed_only=${payed_only}&active_only=${active_only}`,
                    {
                        headers: {
                            Authorization: `Bearer ${Cookies.get(
                                'access_token'
                            )}`,
                        },
                    }
                )
                .then((resp) => either.right(resp.data.map(mapOrders)))
                .catch((error) => {
                    logout();
                    return either.left(
                        `Something goes wrong status = ${error.response.status}`
                    );
                })
        ),

    getById: (params) => {
        if (!params.id) {
            return new Promise((resolve, _) => {
                resolve(either.left('miss parameter {id}'));
            });
        }
        return axios
            .get<OrderAPI>(`${API.orders}/${params.id}`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('access_token')}`,
                },
            })
            .then((resp) => {
                return either.right(mapOrder(resp.data));
            })
            .catch((error) => {
                logout();
                return either.left(
                    `Something goes wrong status = ${error.response.status}`
                );
            });
    },

    cancelOrder: (id, needRefund) => {
        return fromPromise(
            axios
                .delete<string>(
                    `${API.orders}/${id}/cancel?need_refund=${needRefund}`,
                    {
                        headers: {
                            Authorization: `Bearer ${Cookies.get('access_token')}`,
                        },
                    }
                )
                .then((resp) => either.right(resp.data))
                .catch((_) => either.left('The order was not canceled'))
        );
    },

    prepayment: (id) => {
        return fromPromise(
            axios
                .patch<PrepaymentResponse>(
                    `${API.orders}/${id}/prepayment`,
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${Cookies.get('access_token')}`,
                        },
                    }
                )
                .then((resp) => either.right(resp.data))
                .catch((_) => either.left('Order already marked as payed'))
        );
    },

    sendMessage: (id, message) => {
        return fromPromise(
            axios
                .post<string>(
                    `${API.orders}/${id}/sms`,
                    { message: message },
                    {
                        headers: {
                            Authorization: `Bearer ${Cookies.get('access_token')}`,
                        },
                    }
                )
                .then((resp) => either.right(resp.data))
                .catch((_) => either.left('Something went wrong'))
        );
    },
});
