import { injectable, token } from '@injectable-ts/core';
import React from 'react';
import { useProperty } from '@frp-ts/react';
import { Property } from '@frp-ts/core';
import { Popup } from './popup';

interface PopupControls {
    readonly popupTitle: Property<string>;
    readonly popupIsOpen: Property<boolean>;
}
export interface PopupContainerProps {
    readonly children: React.ReactNode;
}

export const PopupContainer = injectable(
    token('store')<PopupControls>(),
    (popupControls) =>
        ({ children }: PopupContainerProps) => {
            const title = useProperty(popupControls.popupTitle);
            return React.createElement(Popup, {
                children,
                title,
                isOpen: popupControls.popupIsOpen,
            });
        }
);
