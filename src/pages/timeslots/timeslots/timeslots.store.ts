import { Property } from '@frp-ts/core';
import {
    ValueWithEffect,
    valueWithEffect,
} from '../../../utils/run-view-model.utils';
import {
    Calendar,
    Game,
    GridDataResponse,
    MonthsIndexes,
    formatCalendarNumberToStr,
    generateCalendarForMonth,
    numberToMonthsIndexes,
} from './timeslots.model';
import { newLensedAtom } from '@frp-ts/lens';
import { newTimeSlotsService } from '../timeslots.service';
import { constVoid, pipe } from 'fp-ts/lib/function';
import { tap } from '@most/core';
import { createAdapter } from '@most/adapter';
import { either } from 'fp-ts';

export interface TimeSlotsStore {
    readonly month: Property<MonthsIndexes>;
    readonly incrementMonth: () => void;
    readonly decrementMonth: () => void;
    readonly year: Property<number>;
    readonly games: Property<Array<Game>>;
    readonly datetime: Property<string>;
    readonly updateAsideDate: (day: Game[]) => void;
    readonly calendarData: Property<Calendar>;
}

export interface NewTimeSlotsStore {
    (): ValueWithEffect<TimeSlotsStore>;
}
export const newTimeSlotsStore: NewTimeSlotsStore = () => {
    const service = newTimeSlotsService();

    const month = newLensedAtom<MonthsIndexes>(
        numberToMonthsIndexes(new Date().getMonth())
    );
    const year = newLensedAtom<number>(new Date().getFullYear());

    const currentMonthState = newLensedAtom<GridDataResponse>({});

    const games = newLensedAtom<Array<Game>>([]);
    const datetime = newLensedAtom('');

    const calendarData = newLensedAtom<Calendar>(
        generateCalendarForMonth(year.get(), month.get())
    );

    const [updateAsideDate, asideDateEffect] = createAdapter<Game[]>();

    const incrementMonth = () =>
        month.modify((m) => {
            if (numberToMonthsIndexes(m + 1) === 0) {
                year.modify((y) => y + 1);
            }
            return numberToMonthsIndexes(m + 1);
        });

    const decrementMonth = () =>
        month.modify((m) => {
            if (m - 1 < 0) {
                year.modify((y) => y - 1);
                return numberToMonthsIndexes(11);
            } else {
                return numberToMonthsIndexes(m - 1);
            }
        });

    const initGridData = pipe(
        service.getByMontYear(month.get() + 1, year.get()),
        tap((resp) => {
            pipe(
                resp,
                either.fold(constVoid, (data) => {
                    currentMonthState.set(data);
                    calendarData.modify((calendar) => {
                        const newCalendar = calendar.map((calendarData) => {
                            const calendarCell =
                                data[
                                    `${year.get()}-${formatCalendarNumberToStr(
                                        month.get() + 1
                                    )}-${formatCalendarNumberToStr(
                                        calendarData.day
                                    )}`
                                ];
                            const occupiedGames: Array<Game> = !!calendarCell
                                ? calendarCell.map((cell) => ({
                                      ...cell.game,
                                      datetime: cell.datetime,
                                  }))
                                : [];

                            return {
                                ...calendarData,
                                occupiedGames,
                            };
                        });
                        return newCalendar;
                    });
                })
            );
        })
    );

    const asideDataEffect = pipe(
        asideDateEffect,
        tap((occupiedGames) => {
            games.set(occupiedGames);
        })
    );

    return valueWithEffect.new(
        {
            month,
            year,
            incrementMonth,
            decrementMonth,
            games,
            datetime,
            updateAsideDate,
            calendarData,
        },
        initGridData,
        asideDataEffect
    );
};
