import { injectable, token } from '@injectable-ts/core';
import React from 'react';
import { CalendarControls } from './controls.component';
import { Property } from '@frp-ts/core';
import { useProperty } from '@frp-ts/react';
import {
    MonthsIndexes,
    TimeSlotsActions,
} from '../../../timeslots/timeslots.model';

interface CalendarControlsContainerProps {
    readonly month: Property<MonthsIndexes>;
    readonly incrementMonth: () => void;
    readonly decrementMonth: () => void;
    readonly availabilityOpenSlot: Property<boolean>;
    readonly onOpenByAction: (e: TimeSlotsActions) => void;
}

export const CalendarControlsContainer = injectable(
    token('store')<CalendarControlsContainerProps>(),
    (store) => () => {
        const month = useProperty(store.month);
        const availabilityOpenSlot = useProperty(store.availabilityOpenSlot);

        return React.createElement(CalendarControls, {
            ...store,
            month,
            availabilityOpenSlot,
        });
    }
);
