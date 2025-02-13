import { Button } from '../../../../components/button/button.component';
import css from '../popup/order-popup.module.css';
import React, { useState } from 'react';
import { OrderAction } from '../../domain/model/orders.model';

export interface OrderPopupProps {
    readonly closePopup: () => void;
    readonly orderCancel: (needRefund: boolean) => void;
    readonly isOrderPrepayment: (action: string) => void;
    readonly sendMessage: (message: string) => void;
    readonly activeAction: OrderAction | null;
}

export const OrderPopup = ({
    closePopup,
    orderCancel,
    isOrderPrepayment,
    sendMessage,
    activeAction,
}: OrderPopupProps) => {
    const [checkState, setCheckState] = useState(false);
    const [message, setMessage] = useState('');

    const handleInputChange = (
        curentMessage: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        setMessage(curentMessage.target.value);
    };

    const OkButton = () => {
        return (
            <div className={css.message}>
                <Button
                    label={'Ок'}
                    onClick={closePopup}
                    size="small"
                    disabled={false}
                    type={'def'}
                />
            </div>
        );
    };

    switch (activeAction) {
        case 'send a massage':
            return (
                <div className={css.popup}>
                    <textarea
                        value={message}
                        onChange={handleInputChange}
                        placeholder="Текст сообщения"
                        maxLength={155}
                        className={css.textAreaMessage}
                    ></textarea>
                    <div className={css.actions}>
                        <Button
                            label={'Отменить'}
                            onClick={closePopup}
                            size="small"
                            disabled={false}
                            type={'def'}
                        />

                        <Button
                            label={'Отправить'}
                            onClick={() => sendMessage(message)}
                            size="small"
                            disabled={false}
                            type={'prime'}
                        />
                    </div>
                </div>
            );
        case 'remove':
            return <>123</>;
        case 'change bonus':
            return <>123</>;
        case 'prepaid done':
            return <OkButton />;
        case 'cancel done':
            return <OkButton />;
        case 'send a message done':
            return <OkButton />;
        case 'error':
            return <OkButton />;
        case 'prepaid':
            return (
                <div className={css.popup}>
                    <div className={css.actions}>
                        <Button
                            label={'Нет'}
                            onClick={closePopup}
                            size="small"
                            disabled={false}
                            type={'def'}
                        />

                        <Button
                            label={'Да'}
                            onClick={() => isOrderPrepayment('show message')}
                            size="small"
                            disabled={false}
                            type={'prime'}
                        />
                    </div>
                </div>
            );
        default:
            switch (activeAction?.kind) {
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
                                    onClick={closePopup}
                                    size="small"
                                    disabled={false}
                                    type={'def'}
                                />

                                <Button
                                    label={'Отменить заказ'}
                                    onClick={() => orderCancel(checkState)}
                                    size="small"
                                    disabled={false}
                                    type={'prime'}
                                />
                            </div>
                        </div>
                    );
                case 'show massage':
                    return <OkButton />;
                default:
                    return <>ERROR</>;
            }
    }
};
