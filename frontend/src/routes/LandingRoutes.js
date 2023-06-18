import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';
import MainLayout from 'layout/MainLayout';

// dashboard routing
const LandingPage = Loadable(lazy(() => import('views/landing')));

// ==============================|| LANDING ROUTING ||============================== //

const LandingRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <LandingPage />
        }
    ]
};

export default LandingRoutes;
