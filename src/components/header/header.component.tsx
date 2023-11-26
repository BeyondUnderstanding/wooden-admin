import { Link } from 'react-router-dom';
import { Button } from '../button/button.component';
import { constVoid } from 'fp-ts/lib/function';
import css from './header.module.css';
import React from 'react';

export interface HeaderProps {
    readonly routes: ReadonlyArray<{
        readonly route: string;
        readonly label: string;
    }>;
}

export const Header = ({ routes }: HeaderProps) => {
    return (
        <header className={css.header}>
            <h1 className={css.label}>WoodenGames</h1>
            <div className={css.controllWrap}>
                {routes.map((route) => (
                    <Link
                        to={route.route}
                        key={route.label}
                        className={css.link}
                    >
                        <Button
                            label={route.label}
                            onClick={constVoid}
                            disabled={false}
                            type={'def'}
                            theme={[css.button]}
                        />
                    </Link>
                ))}
            </div>
        </header>
    );
};
