import { Link } from 'react-router-dom';
import { Button } from '../button/button.component';
import { constVoid } from 'fp-ts/lib/function';
import css from './header.module.css';

export interface HeaderProps {
    readonly routes: ReadonlyArray<{
        readonly route: string;
        readonly label: string;
    }>;
}

export const Header = ({ routes }: HeaderProps) => {
    return (
        <header className={css.header}>
            <span className={css.label}>WoodenGames</span>
            {routes.map((route) => (
                <Link to={route.route} key={route.label}>
                    <Button
                        label={route.label}
                        onClick={constVoid}
                        disabled={false}
                        type={'def'}
                        theme={[css.button]}
                    />
                </Link>
            ))}
        </header>
    );
};
