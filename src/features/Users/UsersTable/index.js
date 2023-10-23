import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Popconfirm, Table } from "antd";
import EditButton from "src/components/buttons/EditButton";
import DeleteButton from "src/components/buttons/DeleteButton";
import { getAllUsers } from "src/store/slices/userSlice/selectors";
import { deleteUserApi, getAllUsersApi } from "src/store/slices/userSlice/apis";
import Header from "../Header";
import { setSelectedUser } from "src/store/slices/userSlice";
import CreateUserDrawer from "../CreateUserDrawer";

const UserTable = () => {

    const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);


    const dispatch = useDispatch();

    const clients = useSelector(getAllUsers);

    useEffect(() => {
        try {
            dispatch(getAllUsersApi());
        } catch (err) {
            console.log(err);
        }
    }, []);

    const handleEdit = (record, e) => {
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

    const columns = [
        {
            title: "Name",
            dataIndex: "firstname",
            key: "firstname",
            render: (text, record) => `${record.first_name} ${record.last_name}`
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Role",
            dataIndex: "role",
        },
        {
            key: "action",
            title: "Action",
            dataIndex: "action",
            render: (text, record) => (
                <div className="d-flex gap-1">
                    <EditButton onClick={(e) => handleEdit(record, e)} />
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
                <Header />
                <Table dataSource={clients} columns={columns} />
            </div>
            <CreateUserDrawer isOpen={isEditDrawerOpen} handleDrawer={handleDrawer} />
        </>
    );
};

export default UserTable;
