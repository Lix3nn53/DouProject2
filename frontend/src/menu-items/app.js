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
            id: 'sample-page',
            title: 'Demo',
            type: 'item',
            url: '/app/demo',
            icon: icons.IconBrandChrome,
            breadcrumbs: false
        }
    ]
};

export default app;
