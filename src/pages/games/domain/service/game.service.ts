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
import { chain, fromPromise, now } from '@most/core';
import axios from 'axios';
import Cookies from 'js-cookie';
import { either } from 'fp-ts';
import { logout } from '../../../../utils/rest.utils';
import { Params } from 'react-router-dom';
import { pipe } from 'fp-ts/lib/function';
import { NewImg } from '../../game/view/game.view-model';

export interface GamesService {
    readonly getAll: () => Stream<Either<string, ReadonlyArray<Games>>>;
    readonly getById: (params: Params<string>) => Promise<Either<string, Game>>;
    readonly updateMainKeys: (
        args: Game
    ) => Stream<Either<'wrong data' | string, unknown>>;
    readonly createAttributes: (
        args: Game['attributes'],
        gameId: number
    ) => Stream<Either<'wrong data' | string, unknown>>;
    readonly deleteAttributes: (
        args: Game['attributes']
    ) => Stream<Either<'wrong data' | string, unknown>>;
    readonly updateAttributes: (
        args: Game['attributes']
    ) => Stream<Either<'wrong data' | string, unknown>>;
    readonly upladFile: (
        file: NewImg,
        gameId: number
    ) => Stream<Either<'wrong data' | string, { url: string; id: number }>>;
    readonly deleteFile: (
        id: number
    ) => Stream<Either<'wrong data' | string, number>>;
    readonly updateImgPriority: (
        id: number,
        priority: number
    ) => Stream<
        Either<'wrong data' | string, { id: number; priority: number }>
    >;
}

const API = {
    games: `${domain}/games`,
    attribute: `${domain}/games/attribute`,
    files: `${domain}/objects`,
    img: `${domain}/image`,
};

export const newGamesService = (): GamesService => ({
    getAll: () =>
        fromPromise(
            axios
                .get<ReadonlyArray<GamesAPI>>(`${API.games}`, {
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
            .get<GameAPI>(`${API.games}/${params.id}`, {
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
    updateMainKeys: (args) => {
        return fromPromise(
            axios
                .patch(API.games, args, {
                    headers: {
                        Authorization: `Bearer ${Cookies.get('access_token')}`,
                    },
                })
                .catch((_) => either.left('err'))
        );
    },
    createAttributes: (args, gameId) => {
        return fromPromise(
            axios
                .post(
                    API.attribute,
                    {
                        items: args
                            .filter((el) => el.localeState === 'new')
                            .map((el) => ({
                                name: el.name,
                                value: el.value,
                                is_main: el.isMain,
                                game_id: gameId,
                            })),
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${Cookies.get(
                                'access_token'
                            )}`,
                        },
                    }
                )
                .catch((_) => either.left('err'))
        );
    },
    deleteAttributes: (args) => {
        const currAttr = args.filter((a) => a.localeState === 'deleted');

        if (currAttr.length === 0) {
            return now(either.right(undefined));
        }

        const subStr = currAttr
            .map((a) => a.id)
            .reduce(
                (cur, next, i, arr) =>
                    cur + next + (i !== arr.length - 1 ? '&item_id=' : ''),
                'item_id='
            );
        return fromPromise(
            axios
                .delete(`${API.attribute}?${subStr}`, {
                    headers: {
                        Authorization: `Bearer ${Cookies.get('access_token')}`,
                    },
                })
                .catch((_) => either.left('err'))
        );
    },
    updateAttributes: (args) => {
        return fromPromise(
            axios
                .patch(
                    API.attribute,
                    {
                        items: args
                            .filter(
                                (el) =>
                                    el.localeState !== 'new' &&
                                    el.localeState !== 'deleted'
                            )
                            .map((el) => ({
                                id: el.id,
                                name: el.name,
                                value: el.value,
                                is_main: el.isMain,
                            })),
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${Cookies.get(
                                'access_token'
                            )}`,
                        },
                    }
                )
                .catch((_) => either.left('err'))
        );
    },
    upladFile: (file, gameId) => {
        const formData = new FormData();
        formData.append('file', file.img);

        const t = fromPromise(
            axios.post<{ url: string }>(API.files, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${Cookies.get('access_token')}`,
                },
            })
        );

        const saveImg = (data: string) =>
            fromPromise(
                axios
                    .post<{ id: number }>(
                        API.img,
                        {
                            game_id: gameId,
                            link: data,
                            priority: file.priority,
                        },
                        {
                            headers: {
                                Authorization: `Bearer ${Cookies.get(
                                    'access_token'
                                )}`,
                            },
                        }
                    )
                    .then((x) =>
                        either.right({
                            url: data,
                            id: x.data.id,
                        })
                    )
                    .catch((_) => either.left('err'))
            );

        return pipe(
            t,
            chain((x) => saveImg(x.data.url))
        );
    },
    deleteFile: (id) => {
        return fromPromise(
            axios
                .delete<{
                    id: number;
                }>(`${API.img}?id=${id}`, {
                    headers: {
                        Authorization: `Bearer ${Cookies.get('access_token')}`,
                    },
                })
                .then((resp) => either.right(resp.data.id))
                .catch((_) => either.left('err'))
        );
    },
    updateImgPriority: (id, priority) => {
        return fromPromise(
            axios
                .patch<{ id: number }>(
                    API.img,
                    {
                        id,
                        priority,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${Cookies.get(
                                'access_token'
                            )}`,
                        },
                    }
                )
                .catch((_) => either.left('err'))
        );
    },
});
