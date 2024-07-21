import { Button } from '../../../../../components/button/button.component';
import {
    MonthsIndexes,
    TimeSlotsActions,
    months,
} from '../../../timeslots/timeslots.model';
import css from './controls.module.css';

interface CalendarControlsProps {
    readonly month: MonthsIndexes;
    readonly incrementMonth: () => void;
    readonly decrementMonth: () => void;
    readonly onOpenByAction: (e: TimeSlotsActions) => void;
    readonly availabilityOpenSlot: boolean;
}

export const CalendarControls = ({
    month,
    incrementMonth,
    decrementMonth,
    onOpenByAction,
    availabilityOpenSlot,
}: CalendarControlsProps) => {
    return (
        <div className={css.wrapControls}>
            <div className={css.wrap}>
                <button onClick={decrementMonth} className={css.leftArrow}>
                    <Arraw />
                </button>
                <span>{months[month]}</span>
                <button onClick={incrementMonth} className={css.rightArrow}>
                    <Arraw />
                </button>
            </div>
            <div className={css.btnWrap}>
                <Button
                    label={'закрыть слот'}
                    onClick={() => onOpenByAction('close slote')}
                    disabled={false}
                    type={'def'}
                />
                <Button
                    label={'открыть слот'}
                    onClick={() => onOpenByAction('open slote')}
                    disabled={availabilityOpenSlot}
                    type={'def'}
                />
            </div>
        </div>
    );
};

const Arraw = () => {
    return (
        <svg
            width="20"
            height="21"
            viewBox="0 0 20 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M15 7.57776L10 12.5778L5 7.57776"
                stroke="#120F07"
                strokeWidth="1.78889"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M15 7.57776L10 12.5778L5 7.57776"
                stroke="black"
                strokeOpacity="0.2"
                strokeWidth="1.78889"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M15 7.57776L10 12.5778L5 7.57776"
                stroke="black"
                strokeOpacity="0.2"
                strokeWidth="1.78889"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M15 7.57776L10 12.5778L5 7.57776"
                stroke="black"
                strokeOpacity="0.2"
                strokeWidth="1.78889"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};
