import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { PreGame } from './components/PreGame';
import { PlayerProvider } from './providers/PlayerProvider';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />
    },
    {
        path: '/game',
        element: <PreGame />
    }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <PlayerProvider>
        <RouterProvider router={router} />
    </PlayerProvider>
);

