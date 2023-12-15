import { Property } from '@frp-ts/core';
import { Button } from '../button/button.component';
import css from './popup.module.css';
import { useProperty } from '@frp-ts/react';

export interface PopupProps {
    readonly onCancelText: string;
    readonly onCompliteText: string;
    readonly title: string;
    readonly children: React.ReactNode;
    readonly onCancel: () => void;
    readonly onComplite: () => void;
    readonly isOpen: Property<boolean>;
}

export const Popup = ({
    onCancelText,
    onCompliteText,
    title,
    children,
    onCancel,
    onComplite,
    isOpen,
}: PopupProps) => {
    const open = useProperty(isOpen);
    return open ? (
        <div className={css.wrap}>
            <div className={css.body}>
                <h3 className={css.title}>{title}</h3>
                {children}
                <div className={css.controls}>
                    <Button
                        label={onCancelText}
                        onClick={onCancel}
                        disabled={false}
                        size="medium"
                        type={'def'}
                    />
                    <Button
                        label={onCompliteText}
                        onClick={onComplite}
                        disabled={false}
                        size="medium"
                        type={'prime'}
                    />
                </div>
            </div>
        </div>
    ) : null;
};
