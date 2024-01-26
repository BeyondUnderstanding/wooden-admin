export type MonthsIndexes = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;
export const numberToMonthsIndexes = (month: number): MonthsIndexes => {
    if (month < 12) {
        return month as MonthsIndexes;
    } else return 0;
};

export const months = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
];

export interface DayInCalendar {
    readonly occupiedGames: Array<Game | 'closed slot'>;
    readonly day: number;
    readonly isCurrentMonth: boolean;
}

export type Calendar = Array<DayInCalendar>;

export function formatDate(inputDate: string): string {
    const inputDateTime: Date = new Date(inputDate);

    if (isNaN(inputDateTime.getTime())) {
        throw new Error('Некорректный формат даты');
    }

    const formattedDate: string = inputDateTime.toISOString().split('T')[0];

    return formattedDate;
}

export const getDaysInMonth = (year: number, month: number) =>
    new Date(year, month + 1, 0).getDate();

const getWeeksInMonth = (year: number, month: number) => {
    let firstDayOfMonth = new Date(year, month, 1);
    let firstDayOfWeek = firstDayOfMonth.getDay();
    let lastDayOfMonth = new Date(year, month + 1, 0);
    let totalDaysInMonth = lastDayOfMonth.getDate();
    let weeks = Math.ceil((totalDaysInMonth + firstDayOfWeek) / 7);

    return weeks;
};

export const generateCalendarForMonth = (
    year: number,
    month: number
): Calendar => {
    const daysInCalendar = getWeeksInMonth(year, month) * 7;

    let beforeStartCurrentMonth =
        daysInCalendar -
        getDaysInMonth(year, month) -
        (7 - new Date(year, month, getDaysInMonth(year, month)).getDay());

    let startFrom = getDaysInMonth(year, month - 1) - beforeStartCurrentMonth;

    let day = 1;

    let startAfter = 1;
    const calendar = new Array(daysInCalendar).fill(null).map((_) => {
        if (beforeStartCurrentMonth >= 0) {
            startFrom++;
            beforeStartCurrentMonth--;
            return {
                occupiedGames: [],
                day: startFrom - 1,
                isCurrentMonth: false,
            };
        } else if (day <= getDaysInMonth(year, month)) {
            day++;
            return {
                occupiedGames: [],
                day: day - 1,
                isCurrentMonth: true,
            };
        } else {
            startAfter++;
            return {
                occupiedGames: [],
                day: startAfter - 1,
                isCurrentMonth: false,
            };
        }
    });

    return calendar;
};

export interface Game {
    id: number;
    title: string;
    images: Array<{
        id: number;
        game_id: number;
        link: string;
        priority: number;
    }>;
    datetime: string;
    game_to_book: {
        book_id: number;
    };
}

export interface GridData {
    game: Game | null;
    datetime: string;
    orderId: number;
}

export interface GridDataResponse {
    [key: string]: Array<GridData>;
}

export const formatCalendarNumberToStr = (n: number): string => {
    if (n < 10) {
        return `0${n}`;
    } else {
        return `${n}`;
    }
};

export const DateStringToISODateStringWithoutTineZone = (
    date: string
): string => {
    return new Date(date).toISOString().slice(0, -1);
};

// end region

export type TimeSlotsActions = 'close slote' | null;
