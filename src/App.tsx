import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from './pages/layout/layout.component';
import Cookies from 'js-cookie';
import { redirect } from 'react-router-dom';
import { LoginPage } from './pages/login/login.page';
import { OrdersPage } from './pages/orders/view/orders.page';
import React from 'react';

const loader = async () => {
    if (!Cookies.get('access_token')) {
        return redirect('../login');
    }
    return null;
};

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
                // loader: loader - заранее подгружать данные
                element: <div>12</div>,
            },
            {
                path: '/games',
                element: <div>games</div>,
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
