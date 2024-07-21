import { constVoid, pipe } from 'fp-ts/lib/function';
import {
    ValueWithEffect,
    valueWithEffect,
} from '../../../utils/run-view-model.utils';
import { injectable, token } from '@injectable-ts/core';
import { TimeSlotsStore } from '../timeslots/timeslots.store';
import { newLensedAtom } from '@frp-ts/lens';
import { createAdapter } from '@most/adapter';
import { chain, empty, tap } from '@most/core';
import { either } from 'fp-ts';

export interface BaseInfoGame {
    title: string;
    description: string;
    price: number;
}

export interface TimeSlotsPopupViewModel {
    readonly setCloseSlot: (data: string) => void;
    readonly onCancel: () => void;
    readonly onSave: () => void;
    readonly activeDate: string;
}

export interface NewTimeSlotsPopupViewModel {
    (): ValueWithEffect<TimeSlotsPopupViewModel>;
}
export const newTimeSlotsPopupViewModel = injectable(
    token('store')<TimeSlotsStore>(),
    (store): NewTimeSlotsPopupViewModel =>
        () => {
            const closeedDateISOFormat = newLensedAtom<string>('');
            const [closeSloteOnSave, closeSloteOnSaveEvent] =
                createAdapter<void>();

            const onSaveEffect = pipe(
                closeSloteOnSaveEvent,
                chain((_) => {
                    switch (store.activeAction.get()) {
                        case 'close slote':
                            return store.closeSlot(closeedDateISOFormat.get());
                        case 'open slote':
                            return store.openSlot();
                        default:
                            return empty();
                    }
                }),
                tap((resp) => {
                    pipe(
                        resp,
                        either.fold(
                            (err) => {
                                throw Error('ALARM' + err); // :TODO сделать открытие попап ошибк
                            },
                            () => store.onOpenByAction(null)
                        )
                    );
                })
            );
            return valueWithEffect.new(
                {
                    setCloseSlot: (x) => closeedDateISOFormat.set(x),
                    onCancel: () => store.onOpenByAction(null),
                    onSave: closeSloteOnSave,
                    activeDate: `${store.year.get()}-${
                        store.month.get() + 1
                    }-${store.dayInStore.get()}`,
                },
                onSaveEffect
            );
        }
);
