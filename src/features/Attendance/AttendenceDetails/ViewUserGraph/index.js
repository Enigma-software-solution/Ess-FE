import React from 'react';
import { Column } from '@ant-design/plots';

const ViewUserAttendanceGraph = () => {
    const data = [
        {
            date: '2023-11-01',
            checkinTime: '09:00 AM',
            checkoutTime: '05:00 PM',
            status: 'Present',
        },
        {
            date: '2023-11-02',
            checkinTime: '09:10 AM',
            checkoutTime: '05:00 PM',
            status: 'Absent',
        },
        {
            date: '2023-11-03',
            checkinTime: '10:10 AM',
            checkoutTime: '05:00 PM',
            status: 'Late',
        },
        {
            date: '2023-11-04',
            checkinTime: '11:10 AM',
            checkoutTime: '05:00 PM',
            status: 'Present',
        },
        {
            date: '2023-11-05',
            checkinTime: '11:10 AM',
            checkoutTime: '05:00 PM',
            status: 'Late',
        },
        {
            date: '2023-11-06',
            checkinTime: '',
            checkoutTime: '',
            status: 'Absent',
        },
        {
            date: '2023-11-07',
            checkinTime: '11:10 AM',
            checkoutTime: '05:00 PM',
            status: 'Present',
        },
    ];
    const paletteSemanticRed = '#F4664A';
    const brandColor = '#5B8FF9';
    const LateColor = '#5BddF9';
    const config = {
        data,
        xField: 'date', // Switched to 'date'
        yField: 'checkinTime', // Switched to 'status'
        seriesField: '',
        color: ({ date }) => {
            if (checkinTime === "") {
                return paletteSemanticRed;
            } else if (checkinTime === '11:10 AM') {
                return LateColor;
            }
            return brandColor;
        },
        label: {
            content: (originData) => {
                const val = parseFloat(originData.status);

                if (val < 0.05) {
                    return (val * 100).toFixed(1) + '%';
                }
            },
            offset: 10,
        },
        legend: false,
        xAxis: {
            label: {
                autoHide: true,
                autoRotate: false,
            },
        },
    };
    return <Column {...config} />;
};

export default ViewUserAttendanceGraph;
