import css from './order.module.css';
import { OrderInterface } from '../domain/model/order.model';

export const Order = (params:OrderInterface) => {
    alert(params.id);
    return (
        <div className={css.wrap}>
            <div className={css.headline}>
                <h2>Заказ № {'99'}</h2>
            </div>
        </div>
    );
};
