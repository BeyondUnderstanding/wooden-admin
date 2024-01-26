import React from 'react';
import { newTimeSlotsStore } from './timeslots.store';
import { useValueWithEffect } from '../../../utils/run-view-model.utils';
import { Timeslots } from './timeslots.component';

export interface TimeslotsContainerProps {}

export const TimeslotsContainer = ({}: TimeslotsContainerProps) => {
    const store = useValueWithEffect(() => newTimeSlotsStore(), []);

    const TimeslotsResolve = Timeslots({
        store,
    });

    return React.createElement(TimeslotsResolve, {});
};
