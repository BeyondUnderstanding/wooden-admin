import { injectable, token } from '@injectable-ts/core';
import React from 'react';
import { GamePopupBody } from './popup.component';
import { GameStore } from '../game.store';
import { useProperties, useProperty } from '@frp-ts/react';
import { useValueWithEffect } from '../../../../../utils/run-view-model.utils';
import { newGamePopupViewModel } from './popup.view-model';

export const GamePopupBodyContainer = injectable(
    token('store')<GameStore>(),
    (store) => () => {
        const initData = useProperty(store.game);

        const vm = useValueWithEffect(
            () => newGamePopupViewModel(initData),
            []
        );

        const [baseInfo, characteristics] = useProperties(
            vm.baseInfo,
            vm.characteristics
        );

        return React.createElement(GamePopupBody, {
            ...store,
            ...vm,
            type: store.activeAction,
            onChange: store.onChangeGame,
            initData,
            baseInfo,
            characteristics,
        });
    }
);
