import { injectable } from '@injectable-ts/core';
import { Calendar as CalendarI } from '../../timeslots/timeslots.model';
import { CalendarDay } from './calendar-day/calendar-day.component';
import css from './calendar.module.css';

interface CalendarProps {
    readonly calendarData: CalendarI;
}

export const Calendar = injectable(
    CalendarDay,
    (CalendarDayContainer) =>
        ({ calendarData }: CalendarProps) => {
            return (
                <div>
                    <div className={css.calendarWrap}>
                        {calendarData.map((date) => (
                            <CalendarDayContainer
                                {...date}
                                key={date.day + `${date.isCurrentMonth}`}
                            />
                        ))}
                    </div>
                </div>
            );
        }
);
