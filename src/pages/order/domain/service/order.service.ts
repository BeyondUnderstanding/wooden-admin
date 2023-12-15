import { domain } from '../../../../entry-api';
import Cookies from 'js-cookie';
import { either } from 'fp-ts';
import { Params } from 'react-router-dom';
import axios from 'axios';
import { OrderInterface } from '../model/order.model';
import { logout } from '../../../../utils/rest.utils';

const API = {
    orders: `${domain}/games`,
};
export const newOrderService = () => ({
    getById: (params: Params<string>) => {
        if (!params.id) {
            return new Promise((resolve, _) => {
                resolve(either.left('miss parameter {id}'));
            });
        }
        return axios
            .get<OrderInterface>(`${API.orders}/${params.id}`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('access_token')}`,
                },
            })
            .catch((error) => {
                // logout();
                return either.left(
                    `Something goes wrong status = ${error.response.status}`
                );
            });
            
    },
});