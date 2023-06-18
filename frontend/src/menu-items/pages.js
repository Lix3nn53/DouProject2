// assets
import { IconKey } from '@tabler/icons';

// constant
const icons = {
    IconKey
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
    id: 'pages',
    title: 'Pages',
    caption: 'Pages Caption',
    type: 'group',
    children: [
        {
            id: 'login3',
            title: 'Login',
            type: 'item',
            url: '/pages/login',
            icon: icons.IconKey
        },
        {
            id: 'register3',
            title: 'Register',
            type: 'item',
            url: '/pages/register',
            icon: icons.IconKey
        }
    ]
};

export default pages;
