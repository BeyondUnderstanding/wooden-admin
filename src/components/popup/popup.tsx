import { Property } from '@frp-ts/core';
import css from './popup.module.css';
import { useProperty } from '@frp-ts/react';


export interface PopupProps {
    readonly title: string;
    readonly children: React.ReactNode;
    readonly isOpen: Property<boolean>;
}

export const Popup = ({ title, children, isOpen }: PopupProps) => {
    const open = useProperty(isOpen);
    return open ? (
        <div className={css.wrap}>
            <div className={css.body}>
                <h3 className={css.title}>{title}</h3>
                {children}
            </div>
        </div>
    ) : null;
};


