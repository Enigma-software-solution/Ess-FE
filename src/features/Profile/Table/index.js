import React, { useEffect } from "react";
import { Table } from 'antd';
import EditButton from 'src/components/buttons/EditButton';
import DeleteButton from 'src/components/buttons/DeleteButton';
import { useDispatch, useSelector } from 'react-redux';
import { getProfilesApi } from "src/store/slices/profielSlice/apis";
import { getAllProfiles } from "src/store/slices/profielSlice/selectors";
import Header from "../Header";

const ProfileTable = () => {

    const dispatch = useDispatch()

    const profileData = useSelector(getAllProfiles)

    const handleEdit = (record) => {
        console.log("Edit clicked for:", record);
    };

    const handleDelete = (record) => {
        // Implement your delete logic here
        console.log("Delete clicked for:", record);
    };

    const columns = [
        {
            key: "name",
            title: "Profile Name",
            dataIndex: "name",
        },
        {
            key: "email",
            title: "Email",
            dataIndex: "email",
        },
        {
            key: "phoneNumber",
            title: "Phone Number",
            dataIndex: "phoneNumber",
        },
        {
            key: "status",
            title: "Status",
            dataIndex: "status",
        },
        {
            key: "action",
            title: "Action",
            dataIndex: "action",
            render: (text, record) => (
                <div className='d-flex gap-1'>
                    <EditButton onClick={() => handleEdit(record)} />
                    <DeleteButton onClick={() => handleDelete(record)} />
                </div>
            )
        },
    ];

    useEffect(() => {
        dispatch(getProfilesApi())
    }, [])

    return (
        <>
            <div>
                <Header />
                <Table dataSource={profileData} columns={columns} />
            </div>
        </>
    );
};

export default ProfileTable;
