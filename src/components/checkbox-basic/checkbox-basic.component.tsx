import { useState, useEffect } from 'react';
import css from './checkbox-basic.module.css';

interface CheckboxBasikProps {
    readonly label?: string;
    readonly getCheckedState?: (x: boolean) => void;
    readonly isCheckedInit?: boolean;
}

export const CheckboxBasik = ({
    label,
    getCheckedState,
    isCheckedInit,
}: CheckboxBasikProps) => {
    const [isChecked, setIsChecked] = useState(isCheckedInit ?? false);

    useEffect(() => {
        getCheckedState && getCheckedState(isChecked);
    }, [getCheckedState, isChecked]);
    return (
        <>
            <label className={css['custom-checkbox']}>
                <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => {
                        isCheckedInit === undefined && setIsChecked(!isChecked);
                    }}
                />
                <span className={css['checkmark']}></span>

                {!!label ? (
                    <span className={css['right-label']}>{label}</span>
                ) : null}
            </label>
        </>
    );
};
