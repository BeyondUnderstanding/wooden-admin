import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from './pages/layout/layout.component';
import Cookies from 'js-cookie';
import { redirect } from 'react-router-dom';
import { LoginPage } from './pages/login/login.page';
import { OrdersPage } from './pages/orders/view/orders.page';
import React from 'react';
import { GamesContainer } from './pages/games/view/games.container';
import { GameContainer } from './pages/games/game/view/game.container';
import { newGamesService } from './pages/games/domain/service/game.service';
import { newGamesStore } from './pages/games/view/games.store';
import { TimeslotsContainer } from './pages/timeslots/timeslots/timeslots.container';

const loader = async () => {
    if (!Cookies.get('access_token')) {
        return redirect('../login');
    }
    return null;
};

const gameService = newGamesService();
const GamesResolve = GamesContainer({
    newStore: newGamesStore({ service: gameService }),
});

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        loader: loader,
        children: [
            {
                path: '/',
                element: <OrdersPage />,
            },
            {
                path: 'order/:id',
                element: <div>12</div>,
            },
            {
                path: '/games',
                element: <GamesResolve />,
            },
            {
                path: 'game/:id',
                loader: ({ params }) => gameService.getById(params),
                element: <GameContainer service={gameService} />,
            },
            {
                path: '/timeslots',
                element: <TimeslotsContainer />,
            },
            // {
            //     path: '/newsletters',
            //     element: <div>newsletters</div>,
            // },
        ],
    },
    {
        path: '/login',
        element: <LoginPage />,
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
