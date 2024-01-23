import { injectable, token } from '@injectable-ts/core';
import React from 'react';
import { Property } from '@frp-ts/core';
import { useProperties } from '@frp-ts/react';
import { ReservetedGames } from './reservated-games.component';
import { Game } from '../timeslots/timeslots.model';

interface ReservetedGamesData {
    readonly games: Property<Array<Game | 'closed slot'>>;
    readonly datetime: Property<string>;
}

export const ReservetedGamesContainer = injectable(
    token('store')<ReservetedGamesData>(),
    (store) => () => {
        const [games, datetime] = useProperties(store.games, store.datetime);

        return React.createElement(ReservetedGames, {
            games,
            datetime,
        });
    }
);
