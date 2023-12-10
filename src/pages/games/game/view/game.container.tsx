import React from 'react';
import { Game } from './game.component';
import { useLoaderData } from 'react-router-dom';
import { Either } from 'fp-ts/lib/Either';
import { Game as IGame, emptyGame } from '../../domain/model/game.model';
import { pipe } from 'fp-ts/lib/function';
import { either } from 'fp-ts';

export const GameContainer = () => {
    const game = pipe(
        useLoaderData() as Either<string, IGame>,
        either.fold(emptyGame, (game) => game)
    );
    return React.createElement(Game, {
        ...game,
    });
};
