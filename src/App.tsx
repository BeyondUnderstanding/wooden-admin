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
import { newOrdersService } from './pages/orders/domain/service/orders-rest.service';
import { OrderContainer } from './pages/orders/order/view/order.container';
const loader = async () => {
    if (!Cookies.get('access_token')) {
        return redirect('../login');
    }
    return null;
};

const gameService = newGamesService();
const orderService = newOrdersService();
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
                loader: ({ params }) => orderService.getById(params),
                element: <OrderContainer />,
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
                element: <div>timeslots</div>,
            },
            {
                path: '/newsletters',
                element: <div>newsletters</div>,
            },
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
