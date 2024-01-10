import { injectable, token } from '@injectable-ts/core';
import React from 'react';
import { CalendarControls } from './controls.component';
import { Property } from '@frp-ts/core';
import { useProperty } from '@frp-ts/react';
import { MonthsIndexes } from '../../../timeslots/timeslots.model';

interface CalendarControlsContainerProps {
    readonly month: Property<MonthsIndexes>;
    readonly incrementMonth: () => void;
    readonly decrementMonth: () => void;
}

export const CalendarControlsContainer = injectable(
    token('store')<CalendarControlsContainerProps>(),
    (store) => () => {
        const month = useProperty(store.month);

        return React.createElement(CalendarControls, {
            ...store,
            month,
        });
    }
);
