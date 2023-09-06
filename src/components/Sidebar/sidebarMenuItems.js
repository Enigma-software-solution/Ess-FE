import { UserOutlined, DashboardOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { routes } from 'src/constant/routes';


export const sidebarMenuItems = [
    {
        key: routes.DASHBOARD,
        title: 'Dashboard',
        icon: <DashboardOutlined />,
        path: routes.DASHBOARD,
    },
    {
        key: routes.DAILY_APPLY,
        title: 'Daily Apply',
        icon: <DashboardOutlined />,
        path: routes.DAILY_APPLY,
    },
    {
        key: routes.SALES_EXECUTIVE,
        title: 'Sales',
        icon: <UsergroupAddOutlined />,
        path: routes.SALES_EXECUTIVE,

    },
    {
        key: routes.AGENDA,
        title: 'Agenda',
        icon: <UsergroupAddOutlined />,
        path: routes.AGENDA,

    },
    {
        key: routes.PROFILE,
        title: 'Profile',
        icon: <UsergroupAddOutlined />,
        path: routes.PROFILE,

    },
    {
        key: 'admin',
        title: 'Admin',
        icon: <UserOutlined />,
        subMenu: [
            { key: '/dashboard/sales', title: 'Admin 1', path: '/dashboard/sales' },
            { key: '/dashboard/users', title: 'Admin 2', path: '/dashboard/users' },
            { key: 'admin3', title: 'Admin 3', path: '/dashboard/test' },
        ],
    },
];
