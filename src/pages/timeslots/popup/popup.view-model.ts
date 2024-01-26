import { constVoid, pipe } from 'fp-ts/lib/function';
import {
    ValueWithEffect,
    valueWithEffect,
} from '../../../utils/run-view-model.utils';
import { injectable, token } from '@injectable-ts/core';
import { TimeSlotsStore } from '../timeslots/timeslots.store';
import { newLensedAtom } from '@frp-ts/lens';
import { createAdapter } from '@most/adapter';
import { chain, tap } from '@most/core';
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
                chain((_) => store.closeSlot(closeedDateISOFormat.get())),
                tap((resp) => {
                    pipe(
                        resp,
                        either.fold((err) => {
                            throw Error('ALARM' + err); // :TODO сделать открытие попап ошибк
                        }, constVoid)
                    );
                })
            );
            return valueWithEffect.new(
                {
                    setCloseSlot: (x) => closeedDateISOFormat.set(x),
                    onCancel: () => store.onOpenByAction(null),
                    onSave: closeSloteOnSave,
                },
                onSaveEffect
            );
        }
);
