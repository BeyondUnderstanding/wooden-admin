import { Property } from '@frp-ts/core';
import { useProperty } from '@frp-ts/react';
import css from './popup.module.css';
import {
    DateStringToISODateStringWithoutTineZone,
    TimeSlotsActions,
} from '../timeslots/timeslots.model';
import { Button } from '../../../components/button/button.component';

export interface TimeSlotsPopupBodyProps {
    readonly type: Property<TimeSlotsActions>;
    readonly setCloseSlot: (data: string) => void;
    readonly onCancel: () => void;
    readonly onSave: () => void;
    readonly activeDate: string;
}

export const TimeSlotsPopupBody = ({
    type,
    setCloseSlot,
    onCancel,
    onSave,
    activeDate,
}: TimeSlotsPopupBodyProps) => {
    const action = useProperty(type);

    switch (action) {
        case 'close slote':
            return (
                <div className={css.bodyWrap}>
                    <div className={css.inputWrap}>
                        <span>Закрыть дату на:</span>
                        <input
                            type="date"
                            className={css.input}
                            onChange={(e) =>
                                setCloseSlot(
                                    DateStringToISODateStringWithoutTineZone(
                                        e.target.value
                                    )
                                )
                            }
                        />
                    </div>
                    <div className={css.controls}>
                        <Button
                            label={'No'}
                            onClick={onCancel}
                            disabled={false}
                            size="medium"
                            type={'def'}
                        />
                        <Button
                            label={'Yes'}
                            onClick={onSave}
                            disabled={false}
                            size="medium"
                            type={'prime'}
                        />
                    </div>
                </div>
            );
        case 'open slote':
            return (
                <div className={css.bodyWrap}>
                    <div className={css.inputWrap}>
                        <span>Открыть дату на: {activeDate}</span>
                    </div>
                    <div className={css.controls}>
                        <Button
                            label={'No'}
                            onClick={onCancel}
                            disabled={false}
                            size="medium"
                            type={'def'}
                        />
                        <Button
                            label={'Yes'}
                            onClick={onSave}
                            disabled={false}
                            size="medium"
                            type={'prime'}
                        />
                    </div>
                </div>
            );
        default:
            return <span>Что то пошло не так</span>;
    }
};
