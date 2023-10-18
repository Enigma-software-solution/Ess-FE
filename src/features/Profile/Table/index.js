import React, { useEffect, useState } from "react";
import { Table } from 'antd';
import EditButton from 'src/components/buttons/EditButton';
import DeleteButton from 'src/components/buttons/DeleteButton';
import { useDispatch, useSelector } from 'react-redux';
import { getProfilesApi } from "src/store/slices/profielSlice/apis";
import { getAllProfiles } from "src/store/slices/profielSlice/selectors";
import Header from "../Header";
import { setSelectedProfile } from "src/store/slices/profielSlice";
import CreateProfileDrawer from "../Drawers/CreateProfileDrawer";

const ProfileTable = () => {
    const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);

    const dispatch = useDispatch()

    const profileData = useSelector(getAllProfiles)

    const handleEdit = (record, e) => {
        e.stopPropagation();
        dispatch(setSelectedProfile(record));
        setIsEditDrawerOpen(true);
    };

    const handleDrawer = () => {
        setIsEditDrawerOpen(false);
        dispatch(setSelectedProfile(null));
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
                    <EditButton onClick={(e) => handleEdit(record, e)} />
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
            <CreateProfileDrawer isOpen={isEditDrawerOpen} handleDrawer={handleDrawer} />
        </>
    );
};

export default ProfileTable;
