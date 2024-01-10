import { DayInCalendar, Game } from '../../../timeslots/timeslots.model';
import cn from 'classnames';
import css from './calendar-day.module.css';
import { injectable, token } from '@injectable-ts/core';

interface CalendarDayContext {
    readonly updateAsideDate: (day: Game[]) => void;
}

export const CalendarDay = injectable(
    token('store')<CalendarDayContext>(),
    (store) =>
        ({ day, isCurrentMonth, occupiedGames }: DayInCalendar) => {
            return (
                <div
                    className={cn(css.wrap, {
                        [css.isCurrentMonth]: !isCurrentMonth,
                        [css.notEmpty]: occupiedGames.length > 0,
                    })}
                    onClick={() => store.updateAsideDate(occupiedGames)}
                >
                    <div>
                        <span>{day}</span>
                    </div>
                </div>
            );
        }
);
