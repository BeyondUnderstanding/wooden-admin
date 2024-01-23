import { DayInCalendar, Game } from '../../../timeslots/timeslots.model';
import cn from 'classnames';
import css from './calendar-day.module.css';
import { injectable, token } from '@injectable-ts/core';

interface CalendarDayContext {
    readonly updateAsideDate: (day: Array<Game | 'closed slot'>) => void;
}

export const CalendarDay = injectable(
    token('store')<CalendarDayContext>(),
    (store) =>
        ({ day, isCurrentMonth, occupiedGames }: DayInCalendar) => {
            const ClosedDay = () => {
                if (
                    occupiedGames.length > 0 &&
                    isCurrentMonth &&
                    occupiedGames.every((d) => d === 'closed slot')
                ) {
                    return <span>Слот закрыт</span>;
                } else {
                    return null;
                }
            };
            return (
                <div
                    className={cn(css.wrap, {
                        [css.isCurrentMonth]: !isCurrentMonth,
                        [css.notEmpty]:
                            occupiedGames.length > 0 && isCurrentMonth,
                        [css.closedDay]:
                            occupiedGames.length > 0 &&
                            isCurrentMonth &&
                            occupiedGames.every((d) => d === 'closed slot'),
                    })}
                    onClick={() =>
                        isCurrentMonth && store.updateAsideDate(occupiedGames)
                    }
                >
                    <div
                        className={cn({
                            [css.closedDayContent]:
                                occupiedGames.length > 0 &&
                                isCurrentMonth &&
                                occupiedGames.every((d) => d === 'closed slot'),
                        })}
                    >
                        <span>{day}</span>
                        <ClosedDay />
                    </div>
                </div>
            );
        }
);
