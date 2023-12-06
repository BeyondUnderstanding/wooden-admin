import React from 'react';
import { Games } from './games.component';
import { useValueWithEffect } from '../../../utils/run-view-model.utils';
import { newGamesStore } from './games.store';
import { newGamesService } from '../domain/service/game.service';
import { useProperty } from '@frp-ts/react';

export const GamesContainer = () => {
    const service = newGamesService();

    const store = useValueWithEffect(() => newGamesStore({ service }), []);

    return React.createElement(Games, {
        games: useProperty(store.games),
        isLoadingExtraOrders: false,
    });
};
