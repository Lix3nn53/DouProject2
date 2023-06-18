// assets
import { IconBrandChrome, IconHelp } from '@tabler/icons';

// constant
const icons = { IconBrandChrome, IconHelp };

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const app = {
    id: 'sample-docs-roadmap',
    title: 'App',
    type: 'group',
    children: [
        {
            id: 'app/demo',
            title: 'Demo',
            type: 'item',
            url: '/app/demo',
            icon: icons.IconBrandChrome,
            breadcrumbs: false
        },
        {
            id: 'app/lexical',
            title: 'Lexical',
            type: 'item',
            url: '/app/lexical',
            icon: icons.IconBrandChrome,
            breadcrumbs: false
        }
    ]
};

export default app;
