import React from 'react';
import { Game } from './game.component';
import { useLoaderData } from 'react-router-dom';
import { Either } from 'fp-ts/lib/Either';
import { Game as IGame, emptyGame } from '../../domain/model/game.model';
import { pipe } from 'fp-ts/lib/function';
import { either } from 'fp-ts';
import { useValueWithEffect } from '../../../../utils/run-view-model.utils';
import { newGameViewModel } from './game.view-model';
import { GamesService } from '../../domain/service/game.service';

export interface GameContainerProps {
    service: GamesService;
}

export const GameContainer = ({ service }: GameContainerProps) => {
    const game = pipe(
        useLoaderData() as Either<string, IGame>,
        either.fold(emptyGame, (game) => game)
    );

    const vm = useValueWithEffect(() => newGameViewModel(service), []);

    return React.createElement(Game, {
        ...game,
        popupIsOpen: vm.popupIsOpen,
        onCancel: vm.onCancel,
    });
};
