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
    TimeSlotsActions,
    formatCalendarNumberToStr,
    generateCalendarForMonth,
    numberToMonthsIndexes,
} from './timeslots.model';
import { newLensedAtom } from '@frp-ts/lens';
import { newTimeSlotsService } from '../timeslots.service';
import { constVoid, flow, pipe } from 'fp-ts/lib/function';
import { chain, tap } from '@most/core';
import { createAdapter } from '@most/adapter';
import { either } from 'fp-ts';
import { fromProperty } from '../../../utils/property.utils';
import { Stream } from '@most/types';
import { Either } from 'fp-ts/lib/Either';

export interface TimeSlotsStore {
    readonly month: Property<MonthsIndexes>;
    readonly incrementMonth: () => void;
    readonly decrementMonth: () => void;
    readonly year: Property<number>;
    readonly games: Property<Array<Game | 'closed slot'>>;
    readonly datetime: Property<string>;
    readonly updateAsideDate: (day: Array<Game | 'closed slot'>) => void;
    readonly calendarData: Property<Calendar>;
    readonly popupTitle: Property<string>;
    readonly popupIsOpen: Property<boolean>;
    readonly onOpenByAction: (e: TimeSlotsActions) => void;
    readonly activeAction: Property<TimeSlotsActions>;
    readonly closeSlot: (isoDate: string) => Stream<Either<string, string>>;
    readonly availabilityOpenSlot: Property<boolean>;
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

    const games = newLensedAtom<Array<Game | 'closed slot'>>([]);
    const datetime = newLensedAtom('');

    const calendarData = newLensedAtom<Calendar>(
        generateCalendarForMonth(year.get(), month.get())
    );

    const [updateAsideDate, asideDateEffect] =
        createAdapter<Array<Game | 'closed slot'>>();

    const popupIsOpen = newLensedAtom(false);
    const popupTitle = newLensedAtom<string>('');

    const [onOpenByAction, onOpenByActionEvent] =
        createAdapter<TimeSlotsActions>();

    const activeAction = newLensedAtom<TimeSlotsActions>(null);

    const availabilityOpenSlot = newLensedAtom(true);

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

    const mapServiceDataToCalendarData = flow(
        either.fold(constVoid, (data: GridDataResponse) => {
            currentMonthState.set(data);
            calendarData.modify((calendar) => {
                const newCalendar = calendar.map((calendarData) => {
                    const calendarCell =
                        data[
                            `${year.get()}-${formatCalendarNumberToStr(
                                month.get() + 1
                            )}-${formatCalendarNumberToStr(calendarData.day)}`
                        ];
                    const occupiedGames = !!calendarCell
                        ? calendarCell.map((cell) =>
                              cell.game
                                  ? {
                                        ...cell.game,
                                        datetime: cell.datetime,
                                    }
                                  : 'closed slot'
                          )
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

    const initGridData = pipe(
        service.getByMontYear(month.get() + 1, year.get()),
        tap(mapServiceDataToCalendarData)
    );

    const asideDataEffect = pipe(
        asideDateEffect,
        tap((occupiedGames) => {
            games.set(occupiedGames);
            if (occupiedGames.every((o) => o === 'closed slot')) {
                availabilityOpenSlot.set(false);
            }
        })
    );

    const updateMonthEffect = pipe(
        month,
        fromProperty,
        chain((x) => service.getByMontYear(x + 1, year.get())),
        tap(mapServiceDataToCalendarData)
    );

    const actionChangeEvent = pipe(
        onOpenByActionEvent,
        tap((action) => {
            activeAction.set(action);
            popupIsOpen.set(!!action);
            //  popupTitle.set(getPopupTitle(action));
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
            popupIsOpen,
            popupTitle,
            onOpenByAction,
            activeAction,
            closeSlot: service.closeSlot,
            availabilityOpenSlot,
        },
        initGridData,
        asideDataEffect,
        updateMonthEffect,
        actionChangeEvent
    );
};
