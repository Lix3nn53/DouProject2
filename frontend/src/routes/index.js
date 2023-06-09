import { useRoutes } from 'react-router-dom';

// routes
import LandingRoutes from './LandingRoutes';
import MainRoutes from './MainRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
    return useRoutes([LandingRoutes, MainRoutes, AuthenticationRoutes]);
}
