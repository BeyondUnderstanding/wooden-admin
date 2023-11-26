import { Outlet } from 'react-router';
import { Header, HeaderProps } from '../../components/header/header.component';
import React from 'react';

const headerProps: HeaderProps = {
    routes: [
        { route: '', label: 'Заказы' },
        { route: '/games', label: 'Игры' },
        { route: '/timeslots', label: 'Таймслоты' },
        { route: '/newsletters', label: 'Рассылки' },
    ],
};

export const Layout = () => {
    return (
        <div>
            <Header {...headerProps} />
            <Outlet />
        </div>
    );
};
