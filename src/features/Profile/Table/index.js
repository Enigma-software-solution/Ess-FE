import React, { useEffect, useState } from "react";
import { Popconfirm, Table } from 'antd';
import EditButton from 'src/components/buttons/EditButton';
import DeleteButton from 'src/components/buttons/DeleteButton';
import { useDispatch, useSelector } from 'react-redux';
import { deteleProfileApi, getProfilesApi } from "src/store/slices/profielSlice/apis";
import { getAllProfiles, isProfileLaoding } from "src/store/slices/profielSlice/selectors";
import Header from "../Header";
import { setSelectedProfile } from "src/store/slices/profielSlice";
import CreateProfileDrawer from "../Drawers/CreateProfileDrawer";
import Loader from "src/components/Loader";
import { getPolicyApi } from "src/store/slices/policySlice/apis";

const ProfileTable = () => {
    const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);

    const isLoading = useSelector(isProfileLaoding);

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

    const handleConfirmDelete = (recordToDelete, e) => {
        e.stopPropagation();
        dispatch(deteleProfileApi(recordToDelete._id));
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
                    <Popconfirm
                        title="Are you sure to delete this Profile?"
                        onConfirm={(e) => handleConfirmDelete(record, e)}
                        onCancel={(e) => e.stopPropagation()}
                        okText="Yes"
                        cancelText="No"
                    >
                        <DeleteButton onClick={(e) => e.stopPropagation()}>Delete</DeleteButton>
                    </Popconfirm>
                </div>
            )
        },
    ];

    useEffect(() => {
        dispatch(getProfilesApi())
    }, [])

    if (isLoading) {
        return <Loader />
    }

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
