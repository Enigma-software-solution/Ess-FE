import { UserOutlined, ContainerOutlined, CalendarOutlined, DashboardOutlined, CheckSquareOutlined, ProfileOutlined, UserSwitchOutlined, UsergroupAddOutlined } from '@ant-design/icons';
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
        icon: <ContainerOutlined />,
        path: routes.DAILY_APPLY,
    },

    {
        key: routes.AGENDA,
        title: 'Agenda',
        icon: <CalendarOutlined />,
        path: routes.AGENDA,

    },
    {
        key: routes.PROFILE,
        title: 'Profile',
        icon: <ProfileOutlined />,
        path: routes.PROFILE,

    },
    {
        key: routes.CLIENT,
        title: 'Client',
        icon: <UsergroupAddOutlined />,
        path: routes.CLIENT,

    },
    {
        key: routes.ATTENDANCE,
        title: 'Attendance',
        icon: <CheckSquareOutlined />,
        path: routes.ATTENDANCE,

    },
    {
        key: routes.USERS,
        title: 'Users',
        icon: <UserSwitchOutlined />,
        path: routes.USERS,
    },

];
