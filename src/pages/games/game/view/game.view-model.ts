import { Property } from '@frp-ts/core';
import {
    ValueWithEffect,
    valueWithEffect,
} from '../../../../utils/run-view-model.utils';
import { GamesService } from '../../domain/service/game.service';
import { newLensedAtom } from '@frp-ts/lens';

export interface GameViewModel {
    readonly popupIsOpen: Property<boolean>;
    readonly onCancel: () => void;
}

export interface NewGameViewModel {
    (service: GamesService): ValueWithEffect<GameViewModel>;
}

export const newGameViewModel: NewGameViewModel = (service) => {
    const popupIsOpen = newLensedAtom(true);

    return valueWithEffect.new({
        popupIsOpen,
        onCancel: () => popupIsOpen.set(false),
    });
};
