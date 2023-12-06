import { Either } from 'fp-ts/lib/Either';
import { Game, GameAPI, mapGame } from '../model/game.model';
import { Stream } from '@most/types';
import { domain } from '../../../../entry-api';
import { fromPromise } from '@most/core';
import axios from 'axios';
import Cookies from 'js-cookie';
import { either } from 'fp-ts';
import { logout } from '../../../../utils/rest.utils';

export interface GamesService {
    readonly getAll: () => Stream<Either<string, ReadonlyArray<Game>>>;
}

const API = {
    orders: `${domain}/games`,
};

export const newGamesService = (): GamesService => ({
    getAll: () =>
        fromPromise(
            axios
                .get<ReadonlyArray<GameAPI>>(`${API.orders}`, {
                    headers: {
                        Authorization: `Bearer ${Cookies.get('access_token')}`,
                    },
                })
                .then((resp) => either.right(resp.data.map(mapGame)))
                .catch((error) => {
                    logout();
                    return either.left(
                        `Something goes wrong status = ${error.response.status}`
                    );
                })
        ),
});
