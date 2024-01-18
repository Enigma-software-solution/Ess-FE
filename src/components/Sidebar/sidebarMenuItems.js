import { ContainerOutlined, CalendarOutlined, DashboardOutlined, CheckSquareOutlined, ProfileOutlined, UserSwitchOutlined, UsergroupAddOutlined, FormOutlined, ProjectOutlined } from '@ant-design/icons';
import { ROLES } from 'src/constant/roles';
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
        roles: [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.SALES_EXECUTIVE],
    },
    {
        key: routes.DAILY_APPLY,
        title: 'Daily Apply',
        icon: <ContainerOutlined />,
        path: routes.DAILY_APPLY,
        roles: [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.SALES_EXECUTIVE],
    },
    {
        key: routes.AGENDA,
        title: 'Agenda',
        icon: <CalendarOutlined />,
        path: routes.AGENDA,
        roles: [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.SALES_EXECUTIVE],
    },
    {
        key: routes.PROFILE,
        title: 'Profile',
        icon: <ProfileOutlined />,
        path: routes.PROFILE,
        roles: [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.SALES_EXECUTIVE],
    },
    {
        key: routes.CLIENT,
        title: 'Client',
        icon: <UsergroupAddOutlined />,
        path: routes.CLIENT,
        roles: [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.SALES_EXECUTIVE],
    },
    {
        key: routes.ATTENDANCE,
        title: 'Attendance',
        icon: <CheckSquareOutlined />,
        path: routes.ATTENDANCE_DASHBOARD,
        roles: [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.HR],
    },
    {
        key: routes.USERS,
        title: 'Users',
        icon: <UserSwitchOutlined />,
        path: routes.USERS,
        roles: [ROLES.SUPER_ADMIN, ROLES.HR, ROLES.ADMIN],
    },
    {
        key: routes.NEW_UPDATE,
        title: 'Project Update',
        icon: <ProjectOutlined />,
        path: routes.NEW_UPDATE,
        roles: [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.HR, ROLES.USER],
    },
    {
        key: routes.POLICIES,
        title: 'Policy',
        icon: <FormOutlined />,
        path: routes.POLICIES,
        roles: [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.HR, ROLES.USER, ROLES.PROJECT_MANAGER],
    },

    {
        key: routes.TEAM_STRUCTURE,
        title: 'Team Structure',
        icon: <FormOutlined />,
        path: routes.TEAM_STRUCTURE,
        roles: [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.HR, ROLES.USER, ROLES.PROJECT_MANAGER, ROLES.SALES_EXECUTIVE],
    },
];
