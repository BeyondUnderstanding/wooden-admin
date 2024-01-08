import { constVoid } from 'fp-ts/lib/function';
import { Button } from '../../../../components/button/button.component';
import css from '../popup/order-popup.module.css';
import React from 'react';
import { injectable, token } from '@injectable-ts/core';
import { Property } from '@frp-ts/core';
import { useProperty } from '@frp-ts/react';


export interface OrderPopupProps {
    id:Property<number>;

}

export const OrderPopup = injectable(
    token('store')<OrderPopupProps>(),
    (store) => () =>{
        const id = useProperty(store.id);
        return(
        <div className={css.popupWrap}>
                    <div className={css.popupWrapBlur}></div>
                    <div className={css.popup}>
                        <h2>Отменить заказ № {id}</h2>
                        <p className={css.warming}>Это необратимое действие.</p>
                        <div className={css.checkBoxWrap}>
                            <input type="checkbox"/>
                            <label> Вернуть деньги</label>
                        </div>
                        <div className={css.actions}>
                            <Button
                                label={'Нет'}
                                onClick={constVoid}
                                size="small"
                                disabled={false}
                                type={'def'}
                            />

                            <Button
                                label={'Отменить заказ'}
                                onClick={constVoid}
                                size="small"
                                disabled={false}
                                type={'prime'}
                            />
                        </div>
                    </div>
                </div>
        )
})
