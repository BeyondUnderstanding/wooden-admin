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
}

export const TimeSlotsPopupBody = ({
    type,
    setCloseSlot,
    onCancel,
    onSave,
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

        default:
            return <span>Что то пошло не так</span>;
    }
};
