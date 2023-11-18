import { Outlet } from 'react-router';
import { Header, HeaderProps } from '../../components/header/header.component';
import css from './layout.module.css';

const headerProps: HeaderProps = {
    routes: [
        { route: '', label: 'Заказы' },
        { route: 'games', label: 'Игры' },
        { route: 'timeslots', label: 'Таймслоты' },
        { route: 'newsletters', label: 'Рассылки' },
    ],
};

export const Layout = () => {
    return (
        <div className={css.wrap}>
            <Header {...headerProps} />
            <Outlet />
        </div>
    );
};
