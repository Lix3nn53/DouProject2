// assets
import { IconBrandChrome, IconHelp, IconFilePlus } from '@tabler/icons';

// constant
const icons = { IconBrandChrome, IconHelp, IconFilePlus };

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
        },
        {
            id: 'app/create',
            title: 'New Document',
            type: 'item',
            url: '/app/create',
            icon: icons.IconFilePlus,
            breadcrumbs: false
        }
    ]
};

export default app;
