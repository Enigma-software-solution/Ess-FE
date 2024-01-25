import React, { useEffect, useState } from "react";
import { Popconfirm, Table } from 'antd';
import EditButton from 'src/components/buttons/EditButton';
import DeleteButton from 'src/components/buttons/DeleteButton';
import { useDispatch, useSelector } from 'react-redux';
import { deteleProfileApi, getProfilesApi, updateProfileApi } from "src/store/slices/profielSlice/apis";
import { getAllProfiles, isProfileLaoding } from "src/store/slices/profielSlice/selectors";
import Header from "../Header";
import { setSelectedProfile } from "src/store/slices/profielSlice";
import CreateProfileDrawer from "../Drawers/CreateProfileDrawer";
import Loader from "src/components/Loader";
import { StyledBadge } from "./styled";
import { capitalize } from "lodash";

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
    const handleChangeStatus = (e, record) => {
        e.stopPropagation();
        if (record._id) {
            dispatch(updateProfileApi({
                id: record._id,
                data: {
                    ...record,
                    status: record?.status === "active" ? 'inactive' : 'active'
                }
            }));
        } else {
            console.error("User record does not have a valid _id");
        }
    };



    const columns = [
        {
            key: "name",
            title: "Profile Name",
            dataIndex: "name",
            render: (text) => capitalize(text),
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
            key: "state",
            title: "City or State",
            dataIndex: "state",
            render: (text) => capitalize(text),
        },
        {
            title: "Status",
            dataIndex: "status",
            render: (text, record) => {
                const isActive = text === "active";
                return (
                    <div className="d-flex gap-1">
                        <Popconfirm
                            title={`Are you sure to ${isActive ? "deactivate" : "activate"} this Profile?`}
                            onConfirm={(e) => handleChangeStatus(e, record)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <StyledBadge onClick={(e) => e.stopPropagation()} status={text}>
                                {capitalize(text)}
                            </StyledBadge>
                        </Popconfirm>
                    </div >
                );
            }
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
