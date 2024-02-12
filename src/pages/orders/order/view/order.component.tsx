import css from './order.module.css';
import { Order as IOrder, OrderAction } from '../../domain/model/orders.model';
import { Button } from '../../../../components/button/button.component';
import { constVoid } from 'fp-ts/lib/function';
import ProductCard from '../product-card/product-card.component';
import { getDateTime } from '../../../../utils/date.utils';
import { PopupContainer } from '../../../../components/popup/popup.container';
import { injectable } from '@injectable-ts/core';
import { OrderPopupContainer } from '../popup/order-popup.container';

interface OrderProps extends IOrder {
    readonly onOpenByAction: (action: OrderAction | null) => void;
}

export const Order = injectable(
    PopupContainer,
    OrderPopupContainer,
    (PopupContainer, Popup) =>
        ({
            //context as your name
            id,
            startDate,
            endDate,
            hasManager,
            managersCount,
            hasBonusGame,
            bonusGame,
            isPrepayment,
            isPayed,
            totalPrice,
            clientName,
            clientPhone,
            clientEmail,
            legalId,
            games,
            onOpenByAction,
        }: OrderProps) => {
            return (
                <div className={css.wrap}>
                    <div className={css.headline}>
                        <h2>Заказ № {id}</h2>
                        <div className={css.actions}>
                            <Button
                                label={'Отменить'}
                                onClick={() =>
                                    onOpenByAction({
                                        kind: 'canel the order',
                                        id,
                                    })
                                }
                                size="small"
                                disabled={false}
                                type={'prime'}
                            />
                            <Button
                                label={'Отправить смс'}
                                onClick={() => {
                                    onOpenByAction('send a massage');
                                }}
                                size="small"
                                disabled={false}
                                type={'def'}
                            />
                            <Button
                                label={'Переместить'}
                                onClick={constVoid}
                                size="small"
                                disabled={false}
                                type={'def'}
                            />
                            <Button
                                label={'Изменить бонус'}
                                onClick={constVoid}
                                size="small"
                                disabled={false}
                                type={'def'}
                            />
                            <Button
                                label={'Предоплачен'}
                                onClick={() => {
                                    onOpenByAction('prepaid');
                                }}
                                size="small"
                                disabled={false}
                                type={
                                    isPrepayment && !isPayed
                                        ? 'def'
                                        : 'disavailable'
                                }
                            />
                        </div>
                    </div>
                    <div className={css.infoBar}>
                        <div className={css.element}>
                            <h3>Информация о заказе</h3>
                            <div className={css.info}>
                                <p>
                                    Дата и время:{' '}
                                    {getDateTime({ startDate, endDate })}
                                </p>
                                <p>
                                    Менеджер:{' '}
                                    {hasManager ? `Да/${managersCount}` : 'Нет'}
                                </p>
                                <p>
                                    Бонусная игра: {hasBonusGame ? `Да` : 'Нет'}
                                </p>
                                <p>Сумма заказа: {totalPrice} ₾</p>
                            </div>
                        </div>

                        <div className={css.element}>
                            <h3>Информация о пользователе</h3>
                            <div className={css.info}>
                                <p>Имя: {clientName}</p>
                                <p>Номер: {clientPhone}</p>
                                <p>Почта: {clientEmail}</p>
                                <p>Паспорт: {legalId}</p>
                            </div>
                        </div>
                    </div>
                    <div className={css.products}>
                        {games.map((productCard, id) => (
                            <ProductCard
                                productCard={productCard}
                                key={id}
                                isBonus={false}
                            />
                        ))}
                    </div>
                    <PopupContainer>
                        <Popup />
                    </PopupContainer>
                </div>
            );
        }
);
