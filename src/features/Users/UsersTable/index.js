import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pagination, Popconfirm, Table } from "antd";
import EditButton from "src/components/buttons/EditButton";
import DeleteButton from "src/components/buttons/DeleteButton";
import {isUserLoading } from "src/store/slices/userSlice/selectors";
import { deleteUserApi, getAllUsersApi, updateUserApi } from "src/store/slices/userSlice/apis";
import Header from "../Header";
import { setSelectedUser } from "src/store/slices/userSlice";
import CreateUserDrawer from "../CreateUserDrawer";
import { StyledBadge } from "./styled";
import { Link } from "react-router-dom";
import { routes } from "src/constant/routes";
import { capitalize } from "lodash";
import dayjs from "dayjs";
import qs from 'qs';

const UserTable = () => {
    const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [users, setUsers] = useState(null);
    
    const dispatch = useDispatch();
    const isLoading = useSelector(isUserLoading);
    
    const { paginator } = users || {};
    const { totalItems, pageSize, page } = paginator || {};

    const handleSearch = (value) => {
        setSearchQuery(value);
    };

    const fetchUsers = async (params) => {
        try {
            const res = await dispatch(getAllUsersApi(params)).unwrap();
            setUsers(res?.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const onPaginationChange = async (page, pageSize) => {
        const params = { page, pageSize };
        const queryStringResult = qs.stringify(params);
        fetchUsers(queryStringResult);
    };

    const handleEdit = (e, record) => {
        e.stopPropagation();
        dispatch(setSelectedUser(record));
        setIsEditDrawerOpen(true);
    };

    const handleDrawer = () => {
        setIsEditDrawerOpen(false);
        dispatch(setSelectedUser(null));
    };

    const handleConfirmDelete = (recordToDelete, e) => {
        e.stopPropagation();
        dispatch(deleteUserApi(recordToDelete._id));
    };

    const handleChangeStatus = (e, record) => {
        e.stopPropagation();
        if (record._id) {
            const data = {
                userId: record._id,
                user: {
                    ...record,
                    status: record?.status === "active" ? 'inactive' : 'active'
                }
            };
            dispatch(updateUserApi(data));
        } else {
            console.error("User record does not have a valid _id");
        }
    };

    const columns = [
        {
            title: "Name",
            dataIndex: "firstname",
            key: "firstname",
            render: (text, record) => capitalize(record?.first_name) + ' ' + capitalize(record?.last_name),
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Joining Date",
            dataIndex: "joining_date",
            key: "joining_date",
            width: 150,
            render: (text, record) => dayjs(record?.joining_date).format('YYYY-MM-DD'),
        },
        {
            title: "Role",
            dataIndex: "role",
            render: (text, record) => capitalize(record?.role).split('_')
        },
        {
            title: "Status",
            dataIndex: "status",
            render: (text, record) => {
                const isActive = text === "active";
                return (
                    <div className="d-flex gap-1">
                        <Popconfirm
                            title={`Are you sure to ${isActive ? "deactivate" : "activate"} this User?`}
                            onConfirm={(e) => handleChangeStatus(e, record)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <StyledBadge onClick={(e) => e.stopPropagation()} status={text}>
                                {capitalize(text)}
                            </StyledBadge>
                        </Popconfirm>
                    </div>
                );
            }
        },
        {
            key: "attendance",
            title: "Attendance",
            dataIndex: "attendance",
            render: (text, record) => (
                <Link to={`${routes.USER_ATTENDANCE_DETAILS}/${record._id}`}>
                    Attendance Details
                </Link>
            ),
        },
        {
            key: "action",
            title: "Action",
            dataIndex: "action",
            render: (text, record) => (
                <div className="d-flex gap-1">
                    <EditButton onClick={(e) => handleEdit(e, record)} />
                    <Popconfirm
                        title="Are you sure to delete this User?"
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
        <>
            <div>
                <Header onSearch={handleSearch} />
                <Table dataSource={users?.Users || []} columns={columns} 
                loading={isLoading} pagination={false} />
                {paginator && users?.Users?.length && (
                    <Pagination
                        style={{ padding: '10px', display: 'flex', justifyContent: 'flex-end' }}
                        total={totalItems}
                        showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                        defaultPageSize={pageSize}
                        defaultCurrent={page}
                        onChange={onPaginationChange}
                        showSizeChanger
                        loading={isLoading}
                    />
                )}
            </div>
            <CreateUserDrawer isOpen={isEditDrawerOpen} handleDrawer={handleDrawer} />
        </>
    );
};

export default UserTable;
