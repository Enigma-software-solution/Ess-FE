import { Button, Tabs } from 'antd';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { routes } from 'src/constant/routes';

const AttendanceTabs = () => {
    const navigate = useNavigate()
    const items = [
        {
            key: routes.ATTENDANCE_DASHBOARD,
            label: 'Attendance Dashboard',
        },

        {
            key: routes.ATTENDANCE_REPORTS,
            label: 'Reports',
        },
        {
            key: routes.DASHBOARD,
            label: 'History',
        },
    ];


    const onChange = (key) => {
        navigate(key)
    }

    return (
        <div>
            <Tabs defaultActiveKey="1" items={items} onChange={onChange} tabBarExtraContent={<Button>Mark Attendance</Button>} />

        </div>
    )
}

export default AttendanceTabs