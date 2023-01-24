import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { PreGame } from './components/PreGame';
import { Scores } from './components/Scores';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>
    },
    {
        path:'/game',
        element: <PreGame/>
    },
    {
        path:'/scores',
        element: <Scores/>
    }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <RouterProvider router={router}/>
);

