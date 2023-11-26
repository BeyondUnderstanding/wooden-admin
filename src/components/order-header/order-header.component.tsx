import { constVoid } from 'fp-ts/lib/function';
import { Button } from '../button/button.component';
import css from './order-header.module.css';

export const OrderHeader = () => {
    return (
        <div className={css.wrap}>
            <span className={css.label}>Заказы</span>
            <div className={css.controll}>
                <input type="text" />
                <Button
                    label={'Открыть'}
                    onClick={constVoid}
                    disabled={false}
                    type={'def'}
                />
            </div>
        </div>
    );
};
