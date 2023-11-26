import { injectable } from '@injectable-ts/core';
import { Table } from '../../../components/table/table.component';
import { OrderHeaderContainer } from '../../../components/order-header/order-header.container';
import css from './orders.module.css';
import { Order } from '../domain/model/orders.model';
import { Loader } from '../../../components/loader/loader.component';

interface OrdersProps {
    readonly orders: ReadonlyArray<Order>;
    readonly isLoadingExtraOrders: boolean;
}

export const Orders = injectable(
    OrderHeaderContainer,
    (OrderHeaderContainer) =>
        ({ orders, isLoadingExtraOrders }: OrdersProps) => {
            return (
                <div className={css.wrap}>
                    <OrderHeaderContainer />
                    <Table
                        headers={[
                            '№',
                            'Имя',
                            'Телефон',
                            'Почта',
                            'Дата',
                            'Оплачен',
                            'Отменен',
                            'Сумма',
                        ]}
                        cells={orders}
                    />
                    {isLoadingExtraOrders && <Loader />}
                </div>
            );
        }
);
