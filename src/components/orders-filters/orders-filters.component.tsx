import { CheckboxBasik } from '../checkbox-basic/checkbox-basic.component';
import css from './orders-filters.module.css';

interface OrdersFiltersProps {
    readonly setOnlyActive: (x: boolean) => void;
    readonly setOnlyPayed: (x: boolean) => void;
}

export const OrdersFilters = ({
    setOnlyActive,
    setOnlyPayed,
}: OrdersFiltersProps) => {
    return (
        <div className={css.wrap}>
            <label className={css.labelFilter}>
                <span>Только активные</span>
                <CheckboxBasik getCheckedState={setOnlyActive} />
            </label>
            <label className={css.labelFilter}>
                <span>Только оплаченные</span>
                <CheckboxBasik getCheckedState={setOnlyPayed} />
            </label>
        </div>
    );
};
