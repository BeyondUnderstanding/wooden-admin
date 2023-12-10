import { injectable, token } from '@injectable-ts/core';
import {
    ValueWithEffect,
    valueWithEffect,
} from '../../../utils/run-view-model.utils';
import { Property } from '@frp-ts/core';
import { newLensedAtom } from '@frp-ts/lens';
import { flow, pipe } from 'fp-ts/lib/function';
import { either } from 'fp-ts';
import { GamesService } from '../domain/service/game.service';
import { Games } from '../domain/model/game.model';
import { tap } from '@most/core';

export interface GamesStore {
    readonly games: Property<ReadonlyArray<Games>>;
    readonly isLoadingExtraOrders: Property<boolean>;
}

// type NewOrdersStore = () => ValueWithEffect<GamesStore>;
export interface NewOrdersStore {
    (): ValueWithEffect<GamesStore>;
}

export const newGamesStore = injectable(
    token('service')<GamesService>(),
    (service): NewOrdersStore =>
        () => {
            const games = newLensedAtom<ReadonlyArray<Games>>([]);
            const isLoadingExtraOrders = newLensedAtom<boolean>(true);

            const initOrdersEffect = pipe(
                service.getAll(),
                tap(
                    flow(
                        either.fold(
                            () => {
                                isLoadingExtraOrders.set(false);
                                games.set([]);
                            },
                            (gamesResp: ReadonlyArray<Games>) => {
                                isLoadingExtraOrders.set(false);
                                games.set(gamesResp);
                            }
                        )
                    )
                )
            );

            return valueWithEffect.new(
                {
                    games,
                    isLoadingExtraOrders,
                },
                initOrdersEffect
            );
        }
);
