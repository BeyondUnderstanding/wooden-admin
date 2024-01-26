import { injectable, token } from '@injectable-ts/core';
import React from 'react';
import { TimeSlotsPopupBody } from './popup.component';
import { newTimeSlotsPopupViewModel } from './popup.view-model';
import { useValueWithEffect } from '../../../utils/run-view-model.utils';
import { Property } from '@frp-ts/core';
import { TimeSlotsActions } from '../timeslots/timeslots.model';

interface TimeSlotsStore {
    readonly activeAction: Property<TimeSlotsActions>;
}

export const TimeSlotsPopupBodyContainer = injectable(
    token('store')<TimeSlotsStore>(),
    newTimeSlotsPopupViewModel,
    (store, runVM) => () => {
        const vm = useValueWithEffect(() => runVM(), []);

        return React.createElement(TimeSlotsPopupBody, {
            ...store,
            ...vm,
            type: store.activeAction,
        });
    }
);
