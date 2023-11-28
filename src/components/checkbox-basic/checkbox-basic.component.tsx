import { useState, useEffect } from 'react';
import css from './checkbox-basic.module.css';

interface CheckboxBasikProps {
    readonly label?: string;
    readonly getCheckedState: (x: boolean) => void;
}

export const CheckboxBasik = ({
    label,
    getCheckedState,
}: CheckboxBasikProps) => {
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        getCheckedState(isChecked);
    }, [getCheckedState, isChecked]);
    return (
        <>
            <label className={css['custom-checkbox']}>
                <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => {
                        setIsChecked(!isChecked);
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
