import { injectable, token } from '@injectable-ts/core';
import React from 'react';
import { Property } from '@frp-ts/core';
import { useProperty } from '@frp-ts/react';
import { Calendar } from './calendar.component';
import { Calendar as CalendarI } from '../../timeslots/timeslots.model';

interface CalendarContainerProps {
    readonly calendarData: Property<CalendarI>;
}

export const CalendarContainer = injectable(
    token('store')<CalendarContainerProps>(),
    Calendar,
    (store, Calendar) => () => {
        const calendarData = useProperty(store.calendarData);

        return React.createElement(Calendar, {
            calendarData,
        });
    }
);
