import React from 'react';
import { Games } from './games.component';
import { useValueWithEffect } from '../../../utils/run-view-model.utils';
import { NewOrdersStore } from './games.store';
import { useProperty } from '@frp-ts/react';
import { injectable, token } from '@injectable-ts/core';

export const GamesContainer = injectable(
    token('newStore')<NewOrdersStore>(),
    (newStore) => () => {
        const store = useValueWithEffect(() => newStore(), []);

        return React.createElement(Games, {
            games: useProperty(store.games),
            isLoadingExtraOrders: false,
        });
    }
);
