export type MonthsIndexes = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;
export const numberToMonthsIndexes = (month: number): MonthsIndexes => {
    switch (month) {
        case 0:
            return 0;
        case 1:
            return 1;
        case 2:
            return 2;
        case 3:
            return 3;
        case 4:
            return 4;
        case 5:
            return 5;
        case 6:
            return 6;
        case 7:
            return 7;
        case 8:
            return 8;
        case 9:
            return 9;
        case 10:
            return 10;
        case 11:
            return 11;
        default:
            return 0;
    }
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
    readonly occupiedGames: Array<Game>;
    readonly day: number;
    readonly isCurrentMonth: boolean;
}

export type Calendar = Array<DayInCalendar>;

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
}

export interface GridData {
    game: Game;
    datetime: string;
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
