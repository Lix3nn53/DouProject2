import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));

// chatgpt routing
const ChatGPTDemo = Loadable(lazy(() => import('views/pages/chatgpt/Demo')));
const AppLexical = Loadable(lazy(() => import('views/pages/chatgpt/Lexical')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/app',
    element: <MainLayout />,
    children: [
        {
            path: '/app/',
            children: [
                {
                    path: 'demo',
                    element: <ChatGPTDemo />
                },
                {
                    path: 'lexical',
                    element: <AppLexical />
                }
            ]
        }
    ]
};

export default MainRoutes;
