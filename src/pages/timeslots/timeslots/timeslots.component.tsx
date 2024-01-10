import { injectable } from '@injectable-ts/core';
import { CalendarControlsContainer } from '../calendar/view/controls/controls.container';
import { CalendarContainer } from '../calendar/view/calendar.container';
import { ReservetedGamesContainer } from '../reservated-games/reservated-games.constainer';
import css from './timeslots.module.css';

export const Timeslots = injectable(
    CalendarControlsContainer,
    CalendarContainer,
    ReservetedGamesContainer,
    (CalendarControlsContainer, CalendarContainer, ReservetedGamesContainer) =>
        () => {
            return (
                <div>
                    <CalendarControlsContainer />
                    <div className={css.wrap}>
                        <CalendarContainer />
                        <ReservetedGamesContainer />
                    </div>
                </div>
            );
        }
);
