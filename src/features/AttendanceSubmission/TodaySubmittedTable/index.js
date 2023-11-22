import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteAttendance, getAllAttendanceApi } from "src/store/slices/attendanceSlice/GetAttendanceSlice/api";
import { Table, Tag } from "antd";
import DeleteButton from "src/components/buttons/DeleteButton";
import EditButton from "src/components/buttons/EditButton";
import { format } from "date-fns";
import qs from "qs";

import { CheckAttendanceStatusColor } from "src/components/Utils/checkAttendanceStatusColor";

const TodaySubmittedTable = ({ todayAllAttendance }) => {

    const dispatch = useDispatch();

    const handleDelete = (id) => {
        dispatch(deleteAttendance(id));
    };


    const handleEdit = (record, e) => { };

    const columns = [
        {
            title: "User Name",
            dataIndex: "user?.first_name",
            key: "first_name",
            render: (text, record) => record?.user?.first_name + ' ' + record?.user?.last_name,
        },

        {
            title: "Check In Time",
            dataIndex: "checkInTime",
            render: (text, record) => format(new Date(record.checkInTime), "p"),
        },
        {
            title: "Status",
            dataIndex: "status",
            render: (text) => {
                return (
                    <Tag color={CheckAttendanceStatusColor(text)}>{text}</Tag>
                );
            },
        },
        {
            key: "action",
            title: "Action",
            dataIndex: "action",
            render: (text, record) => (
                <div className="d-flex gap-1">
                    <EditButton onClick={(e) => handleEdit(record, e)} />
                    <DeleteButton onClick={() => {
                        handleDelete(record?._id);
                    }}
                    >
                        Delete
                    </DeleteButton>
                </div>
            ),
        },
    ];

    return (
        <div>

            <Table
                dataSource={todayAllAttendance?.attendance}
                columns={columns}
                pagination={false}
            />
        </div>
    )
}

export default TodaySubmittedTable