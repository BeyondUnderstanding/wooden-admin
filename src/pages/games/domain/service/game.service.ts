import { Either } from 'fp-ts/lib/Either';
import {
    Game,
    GameAPI,
    Games,
    GamesAPI,
    mapGame,
    mapGames,
} from '../model/game.model';
import { Stream } from '@most/types';
import { domain } from '../../../../entry-api';
import { fromPromise } from '@most/core';
import axios from 'axios';
import Cookies from 'js-cookie';
import { either } from 'fp-ts';
import { logout } from '../../../../utils/rest.utils';
import { Params } from 'react-router-dom';

export interface GamesService {
    readonly getAll: () => Stream<Either<string, ReadonlyArray<Games>>>;
    readonly getById: (params: Params<string>) => Promise<Either<string, Game>>;
}

const API = {
    orders: `${domain}/games`,
};

export const newGamesService = (): GamesService => ({
    getAll: () =>
        fromPromise(
            axios
                .get<ReadonlyArray<GamesAPI>>(`${API.orders}`, {
                    headers: {
                        Authorization: `Bearer ${Cookies.get('access_token')}`,
                    },
                })
                .then((resp) => either.right(resp.data.map(mapGames)))
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
            .get<GameAPI>(`${API.orders}/${params.id}`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('access_token')}`,
                },
            })
            .then((resp) => either.right(mapGame(resp.data)))
            .catch((error) => {
                logout();
                return either.left(
                    `Something goes wrong status = ${error.response.status}`
                );
            });
    },
});
