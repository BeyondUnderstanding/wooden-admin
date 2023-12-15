import { injectable } from '@injectable-ts/core';
import { Table } from '../../../components/table/table.component';
import css from './orders.module.css';
import { Order } from '../domain/model/orders.model';
import { Loader } from '../../../components/loader/loader.component';
import { OrdersFiltersContainer } from '../../../components/orders-filters/orders-filters.container';
import { OrderHeader } from '../../../components/order-header/order-header.component';

interface OrdersProps {
    readonly orders: ReadonlyArray<Order>;
    readonly isLoadingExtraOrders: boolean;
}

export const Orders = injectable(
    OrdersFiltersContainer,
    (OrdersFiltersContainer) =>
        ({ orders, isLoadingExtraOrders }: OrdersProps) => {
            return (
                <div className={css.wrap}>
                    <OrderHeader />
                    <OrdersFiltersContainer />
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
                        slagToOpen="/order/"
                    />
                    {isLoadingExtraOrders && <Loader />}
                </div>
            );
        }
);
