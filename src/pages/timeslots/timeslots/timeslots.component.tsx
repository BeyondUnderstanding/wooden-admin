import { injectable } from '@injectable-ts/core';
import { CalendarControlsContainer } from '../calendar/view/controls/controls.container';
import { CalendarContainer } from '../calendar/view/calendar.container';
import { ReservetedGamesContainer } from '../reservated-games/reservated-games.constainer';
import css from './timeslots.module.css';
import { PopupContainer } from '../../../components/popup/popup.container';
import { TimeSlotsPopupBodyContainer } from '../popup/popup.container';

export const Timeslots = injectable(
    CalendarControlsContainer,
    CalendarContainer,
    ReservetedGamesContainer,
    PopupContainer,
    TimeSlotsPopupBodyContainer,
    (
        CalendarControlsContainer,
        CalendarContainer,
        ReservetedGamesContainer,
        PopupContainer,
        TimeSlotsPopupBodyContainer
    ) =>
        () => {
            return (
                <>
                    <div className={css.wrap}>
                        <CalendarControlsContainer />
                        <div className={css.wrapContent}>
                            <CalendarContainer />
                            <ReservetedGamesContainer />
                        </div>
                    </div>
                    <PopupContainer>
                        <TimeSlotsPopupBodyContainer />
                    </PopupContainer>
                </>
            );
        }
);
