import { MonthsIndexes, months } from '../../../timeslots/timeslots.model';

interface CalendarControlsProps {
    readonly month: MonthsIndexes;
    readonly incrementMonth: () => void;
    readonly decrementMonth: () => void;
}

export const CalendarControls = ({
    month,
    incrementMonth,
    decrementMonth,
}: CalendarControlsProps) => {
    return (
        <div>
            <button onClick={decrementMonth}>-</button>
            <span>{months[month]}</span>
            <button onClick={incrementMonth}>+</button>
        </div>
    );
};
