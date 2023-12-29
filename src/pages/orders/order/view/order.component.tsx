import css from './order.module.css';
import { Order as IOrder } from '../../domain/model/orders.model';
import { Button } from '../../../../components/button/button.component';
import { constVoid } from 'fp-ts/lib/function';
import ProductCard from '../product-card/product-card.component';

interface GetDateTimeProps {
    startDate: Date;
    endDate: Date;
}

interface OrderProps extends IOrder {}

export const Order = ({
    id,
    startDate,
    endDate,
    hasManager,
    managersCount,
    hasBonusGame,
    bonusGame,
    totalPrice,
    clientName,
    clientPhone,
    clientEmail,
    legalId,
    games,
}: OrderProps) => {
    console.log(games);
    const addZeroBefore = (dateAtribut: number) => {
        return dateAtribut < 10 ? '0' + dateAtribut : dateAtribut;
    };
    const getDateTime = ({ startDate, endDate }: GetDateTimeProps) => {
        return `
                ${addZeroBefore(startDate.getDate())}.
                ${addZeroBefore(startDate.getMonth())}.
                ${startDate.getFullYear()} 
                ${addZeroBefore(startDate.getHours())} :
                ${addZeroBefore(startDate.getMinutes())} -
                ${addZeroBefore(endDate.getHours())} :
                ${addZeroBefore(endDate.getMinutes())}
            `;
    };

    return (
        <div className={css.wrap}>
            <div className={css.headline}>
                <h2>Заказ № {id}</h2>
                <div className={css.actions}>
                    <Button
                        label={'Отменить'}
                        onClick={constVoid}
                        size="small"
                        disabled={false}
                        type={'prime'}
                    />
                    <Button
                        label={'Отправить смс'}
                        onClick={constVoid}
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
                        onClick={constVoid}
                        size="small"
                        disabled={false}
                        type={'def'}
                    />
                </div>
            </div>
            <div className={css.infoBar}>
                <div className={css.element}>
                    <h3>Информация о заказе</h3>
                    <div className={css.info}>
                        <p>
                            Дата и время: {getDateTime({ startDate, endDate })}
                        </p>
                        <p>
                            Менеджер:{' '}
                            {hasManager ? `Да/${managersCount}` : 'Нет'}
                        </p>
                        <p>Бонусная игра: {hasBonusGame ? `Да` : 'Нет'}</p>
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
                    <ProductCard productCard={productCard} id={id} />
                ))}
            </div>
        </div>
    );
};
