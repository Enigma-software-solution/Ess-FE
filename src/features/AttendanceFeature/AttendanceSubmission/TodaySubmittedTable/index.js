import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteAttendance } from "src/store/slices/attendanceSlice/GetAttendanceSlice/api";
import { Popconfirm, Table, Tag, Tooltip } from "antd";
import DeleteButton from "src/components/buttons/DeleteButton";
import EditButton from "src/components/buttons/EditButton";
import { format } from "date-fns";
import { CheckAttendanceStatusColor } from "src/components/Utils/checkAttendanceStatusColor";
import { setSelectedAttendance } from "src/store/slices/attendanceSlice/GetAttendanceSlice";
import EditAttendanceModal from "../EditAttendanceModal";
import { capitalize } from "lodash";

const TodaySubmittedTable = ({ todayAllAttendance }) => {
    const [isEditModalVisible, setIsEditModalVisible] = useState(false)
    const dispatch = useDispatch();


    const handleConfirmDelete = (recordToDelete, e) => {
        e.stopPropagation();
        dispatch(deleteAttendance(recordToDelete._id));
    };

    const handleEdit = (record, e) => {
        e.stopPropagation();
        dispatch(setSelectedAttendance(record));
        setIsEditModalVisible(true);
    };

    const handleModalClose = () => {
        setIsEditModalVisible(false)
        dispatch(setSelectedAttendance(null))
    }

    const columns = [
        {
            title: "User Name",
            dataIndex: "user?.first_name",
            key: "first_name",
            render: (text, record) => capitalize(record?.user?.first_name) + ' ' + capitalize(record?.user?.last_name),
        },

        {
            title: "Check In Time",
            dataIndex: "checkInTime",
            render: (text, record) => record?.checkInTime ? format(new Date(record.checkInTime), "p") : 'N/A',
        },
        {
            title: "Check Out Time",
            dataIndex: "checkOutTime",
            render: (text, record) => record?.checkOutTime ? format(new Date(record?.checkOutTime), "p") : 'N/A',
        },

        {
            title: 'Notes',
            dataIndex: 'notes',
            ellipsis: true,
            render: (text, record) => (
                <Tooltip title={text} placement="topLeft" arrowPointAtCenter>
                    <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {text}
                    </div>
                </Tooltip>
            ),
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
                    <Popconfirm
                        title="Are you sure you want to delete
                                   this user attendance?"
                        onConfirm={(e) => handleConfirmDelete(record, e)}
                        onCancel={(e) => e.stopPropagation()}
                        okText="Yes"
                        cancelText="No"
                    >
                        <DeleteButton onClick={(e) => e.stopPropagation()}>Delete</DeleteButton>
                    </Popconfirm>
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

            <EditAttendanceModal
                visible={isEditModalVisible}
                onClose={handleModalClose}
            />
        </div>
    )
}

export default TodaySubmittedTable