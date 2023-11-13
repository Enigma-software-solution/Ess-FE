import { UserOutlined, ContainerOutlined, CalendarOutlined, DashboardOutlined, CheckSquareOutlined, ProfileOutlined, UserSwitchOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { routes } from 'src/constant/routes';


// export const sidebarMenuItems = [
//     {
//         key: routes.DASHBOARD,
//         title: 'Dashboard',
//         icon: <DashboardOutlined />,
//         path: routes.DASHBOARD,
//     },

//     {
//         key: routes.DAILY_APPLY,
//         title: 'Daily Apply',
//         icon: <ContainerOutlined />,
//         path: routes.DAILY_APPLY,
//     },

//     {
//         key: routes.AGENDA,
//         title: 'Agenda',
//         icon: <CalendarOutlined />,
//         path: routes.AGENDA,

//     },
//     {
//         key: routes.PROFILE,
//         title: 'Profile',
//         icon: <UsergroupAddOutlined />,
//         path: routes.PROFILE,

//     },
//     {
//         key: routes.CLIENT,
//         title: 'Client',
//         icon: <UserOutlined />,
//         path: routes.CLIENT,

//     },
//     {
//         key: routes.ATTENDANCE,
//         title: 'Attendance',
//         icon: <UserOutlined />,
//         path: routes.ATTENDANCE,

//     },
//     {
//         key: routes.USERS,
//         title: 'Users',
//         icon: <DashboardOutlined />,
//         path: routes.USERS,
//     },
//     // {
//     //     key: 'admin',
//     //     title: 'Admin',
//     //     icon: <UserOutlined />,
//     //     subMenu: [
//     //         { key: '/dashboard/sales', title: 'Admin 1', path: '/dashboard/sales' },
//     //         { key: '/dashboard/users', title: 'Admin 2', path: '/dashboard/users' },
//     //         { key: 'admin3', title: 'Admin 3', path: '/dashboard/test' },
//     //     ],
//     // },
// ];


export const sidebarMenuItems = [
    {
        key: routes.DASHBOARD,
        title: 'Dashboard',
        icon: <DashboardOutlined />,
        path: routes.DASHBOARD,
        roles: ['admin', "user", "sales-executive"],
    },
    {
        key: routes.DAILY_APPLY,
        title: 'Daily Apply',
        icon: <ContainerOutlined />,
        path: routes.DAILY_APPLY,
        roles: ['admin', 'sales-executive'],
    },
    {
        key: routes.AGENDA,
        title: 'Agenda',
        icon: <CalendarOutlined />,
        path: routes.AGENDA,
        roles: ['admin', 'sales-executive'],
    },
    {
        key: routes.PROFILE,
        title: 'Profile',
        icon: <ProfileOutlined />,
        path: routes.PROFILE,
        roles: ['admin', 'sales-executive'],
    },
    {
        key: routes.CLIENT,
        title: 'Client',
        icon: <UsergroupAddOutlined />,
        path: routes.CLIENT,
        roles: ['admin', 'sales-executive'],
    },
    {
        key: routes.ATTENDANCE,
        title: 'Attendance',
        icon: <CheckSquareOutlined />,
        path: routes.ATTENDANCE_DASHBOARD,
        roles: ['admin', 'sales-executive', 'user'],
    },
    {
        key: routes.USERS,
        title: 'Users',
        icon: <UserSwitchOutlined />,
        path: routes.USERS,
        roles: ['admin'],
    },
];
