import { Button } from '../../../../components/button/button.component';
import css from '../popup/order-popup.module.css';
import React, { useState } from 'react';
import { OrderAction } from '../../domain/model/orders.model';
import { constVoid } from 'fp-ts/lib/function';

export interface OrderPopupProps {
    readonly Close: () => void;
    readonly Cancel: (needRefund: boolean) => void;
    readonly action: OrderAction | null;
    readonly SetPrepayment: (action: string) => void;
}

export const OrderPopup = ({ Close, Cancel, action, SetPrepayment  }: OrderPopupProps) => {
    const [checkState, setCheckState] = useState(false);

    switch (action) {
        case 'send a massage':
            return <>123</>;
        case 'remove':
            return <>123</>;
        case 'change bonus':
            return <>123</>;
        case 'prepaid':
            return (
                    <div className={css.popup}>
                        <div className={css.actions}>
                                <Button
                                    label={'Нет'}
                                    onClick={() => Close()}
                                    size="small"
                                    disabled={false}
                                    type={'def'}
                                />

                                <Button
                                    label={'Да'}
                                    onClick={() => SetPrepayment('show message')}
                                    size="small"
                                    disabled={false}
                                    type={'prime'}
                                />
                            </div>
                    </div>
                        );
        case 'show massage':
            return (
                <div className={css.message}>
                    <Button
                        label={'Ок'}
                        onClick={() => Close()}
                        size="small"
                        disabled={false}
                        type={'def'}
                    />
                </div>
            );
        default:
            switch (action?.kind) {
                case 'canel the order':
                    return (
                        <div className={css.popup}>
                            <p className={css.warming}>
                                Это необратимое действие.
                            </p>
                            <div className={css.checkBoxWrap}>
                                <input
                                    type="checkbox"
                                    checked={checkState}
                                    onChange={() => setCheckState(!checkState)}
                                />
                                <label> Вернуть деньги</label>
                            </div>
                            <div className={css.actions}>
                                <Button
                                    label={'Нет'}
                                    onClick={() => Close()}
                                    size="small"
                                    disabled={false}
                                    type={'def'}
                                />

                                <Button
                                    label={'Отменить заказ'}
                                    onClick={() => Cancel(checkState)}
                                    size="small"
                                    disabled={false}
                                    type={'prime'}
                                />
                            </div>
                        </div>
                    );
                default:
                    return <>ERROR</>;
            }
    }
};
