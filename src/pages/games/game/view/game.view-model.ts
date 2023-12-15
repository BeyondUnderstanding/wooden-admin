import {
    ValueWithEffect,
    valueWithEffect,
} from '../../../../utils/run-view-model.utils';
import { GamesService } from '../../domain/service/game.service';
import { newLensedAtom } from '@frp-ts/lens';
import { Game, GameAction } from '../../domain/model/game.model';
import { createAdapter } from '@most/adapter';
import { pipe } from 'fp-ts/lib/function';
import { tap } from '@most/core';
import { Property } from '@frp-ts/core';
import { fromProperty } from '../../../../utils/property.utils';

export interface GameViewModel {
    readonly popupIsOpen: Property<boolean>;
    readonly onCancel: () => void;
    readonly onOpenByAction: (action: GameAction | null) => void;
    readonly activeAction: Property<GameAction | null>;
    readonly onChangeGame: (data: Partial<Game>) => void;
}

export interface NewGameViewModel {
    (service: GamesService, initGame: Game): ValueWithEffect<GameViewModel>;
}
export const newGameViewModel: NewGameViewModel = (service, initGame) => {
    const game = newLensedAtom(initGame);
    const activeAction = newLensedAtom<GameAction | null>(null);
    const [onOpenByAction, onOpenByActionEvent] =
        createAdapter<GameAction | null>();

    const popupIsOpen = newLensedAtom(false);

    const actionChangeEvent = pipe(
        onOpenByActionEvent,
        tap((action) => {
            activeAction.set(action);
            popupIsOpen.set(!!action);
        })
    );

    const t = pipe(game, fromProperty, tap(console.log));

    return valueWithEffect.new(
        {
            popupIsOpen,
            activeAction,
            onCancel: () => onOpenByAction(null),
            onOpenByAction,
            onChangeGame: (data: Partial<Game>) => {
                game.modify((g) => ({ ...g, ...data }));
                onOpenByAction(null);
            },
        },
        actionChangeEvent,
        t
    );
};
