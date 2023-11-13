// AttendanceTable.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers, isUserLoading } from "src/store/slices/userSlice/selectors";
import { getAllUsersApi } from "src/store/slices/userSlice/apis";
import { Button, Select, Table } from "antd";
import { toast } from "react-toastify";
import { submitAttendanceApi } from 'src/store/slices/attendanceSlice/GetAttendanceSlice/api';
import { Badge, PresentBadge, AbsentBadge, LateBadge } from './styled'; // Import the styled components
import { useNavigate } from "react-router-dom";
import { routes } from "src/constant/routes";

const AttendanceTable = () => {
    const [attendanceData, setAttendanceData] = useState([]);
    const [selectedAttendanceStatus, setSelectedAttendanceStatus] = useState('present');


    const dispatch = useDispatch();
    const navigate = useNavigate();

    const allUsers = useSelector(getAllUsers);

    const currentTime = new Date();
    const nextDay = new Date(currentTime);
    nextDay.setDate(currentTime.getDate() + 1);

    const handleButtonClick = (record) => {
        navigate(`${routes.USER_ATTENDANCE_DETAILS}/${record._id}`);
    };

    const handleAttendanceChange = (value, record) => {
        setAttendanceData((prevData) => {
            const updatedData = prevData.map((item) =>
                item._id === record._id ? { ...item, status: value } : item
            );
            return updatedData;
        });
    };

    const columns = [
        {
            key: "first_name",
            title: "Name",
            dataIndex: "first_name",
        },
        {
            key: "email",
            title: "Email",
            dataIndex: "email",
        },
        {
            key: "status",
            title: "Mark Attendance",
            dataIndex: "status",
            render: (text, record) => (
                <Select
                    defaultValue={text}
                    style={{ width: 120 }}
                    onChange={(value) => handleAttendanceChange(value, record)}
                    options={[
                        { value: 'present', label: 'present' },
                        { value: 'absent', label: 'absent' },
                        { value: 'late', label: 'late' },
                        { value: 'leave', label: 'leave' },
                        { value: 'half-day', label: 'half-day' },
                        { value: 'vacation', label: 'vacation' },
                    ]}
                />
            ),
        },
        {
            key: "badge",
            title: "Badge",
            dataIndex: "status",
            render: (text) => {
                switch (text) {
                    case 'present':
                        return <PresentBadge />;
                    case 'absent':
                        return <AbsentBadge />;
                    case 'late':
                        return <LateBadge />;
                    default:
                        return <Badge />;
                }
            },
        },
        {
            key: "submit",
            title: "Submit",
            dataIndex: "submit",
            render: (text, record) => (
                <Button type="primary" onClick={() => handleSubmitAttendance(record)}>
                    Submit
                </Button>
            ),
        },
        {
            key: "action",
            title: "Action",
            dataIndex: "action",
            render: (text, record) => (
                <div className='d-flex gap-1'>
                    <Button type="primary" onClick={() => handleButtonClick(record)}>Show Details</Button>
                </div>
            ),
        },
    ];


    const handleSubmitAttendance = async (record) => {
        const preparedUser = {
            user: record._id,
            date: nextDay,
            status: selectedAttendanceStatus,
            checkInTime: nextDay,
        };

        try {
            const response = await dispatch(submitAttendanceApi(preparedUser));

            setAttendanceData((prevData) => {
                const updatedData = [...prevData, response.payload.data];
                return updatedData;
            });

            if (response.status === 'success') {
                toast.warn('Attendance Submitted');
            } else {
                toast.warn('Attendance not Submitted');
            }
        } catch (error) {
            console.error('Error submitting attendance:', error);
        }
    };

    useEffect(() => {
        dispatch(getAllUsersApi());
    }, [dispatch]);

    return (
        <>
            <Table dataSource={allUsers} columns={columns} />
        </>
    );
};

export default AttendanceTable;
