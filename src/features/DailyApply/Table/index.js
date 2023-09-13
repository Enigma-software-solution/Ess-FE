import React, { useState, useEffect } from "react";
import { Table, Popconfirm, Button, message } from 'antd';
import EditButton from 'src/components/buttons/EditButton';
import DeleteButton from 'src/components/buttons/DeleteButton';
import Header from '../Header';
import { useDispatch, useSelector } from 'react-redux';
import { getdailyAppliesApi, deteleDailyAppliesApi } from 'src/store/slices/dailyApplySlice/apis';
import { getAllDailyApplies, getLoadingStatus } from "src/store/slices/dailyApplySlice/selectors";
import DailyApplyDrawer from "../Drawer";
import { setSelectedApply } from "src/store/slices/dailyApplySlice";

const DailyAppliesTable = () => {
    const dispatch = useDispatch();
    const dailyAppliesData = useSelector(getAllDailyApplies);
    const loadingStatus = useSelector(getLoadingStatus);
    const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);

    const handleEdit = (record) => {
        dispatch(setSelectedApply(record));
        setIsEditDrawerOpen(true);
    };

    const handleConfirmDelete = (recordToDelete) => {
            dispatch(deteleDailyAppliesApi(recordToDelete._id))
    };

    const columns = [
        {
            key: "name",
            title: "Name",
            dataIndex: "clientName",
        },
        {
            title: "Link",
            dataIndex: "link",
            render: (text) => (<a href={text}>{text}</a>)
        },
        {
            title: "Position To Apply",
            dataIndex: "positionToApply",
        },
        {
            title: "Platform",
            dataIndex: "platform",
        },
        {
            title: "User Email",
            dataIndex: ["user", "email"],
        },
        {
            title: "Company Name",
            dataIndex: "companyName",
        },
        {
            key: "action",
            title: "Action",
            dataIndex: "action",
            render: (text, record) => (
                <div className='d-flex gap-1'>
                    <EditButton onClick={() => handleEdit(record)} />
                    <Popconfirm
                        title="Are you sure to delete this task?"
                        onConfirm={()=>handleConfirmDelete(record)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <DeleteButton>
                            Delete
                        </DeleteButton>
                    </Popconfirm>
                </div>
            )
        },
    ];

    useEffect(() => {
        if (!dailyAppliesData.length) {
            dispatch(getdailyAppliesApi());
        }
    }, []);

    const handleDrawer = () => {
        setIsEditDrawerOpen(false);
        dispatch(setSelectedApply(null));
    };

    return (
        <>
            <Header />
            <Table dataSource={dailyAppliesData} size="small" columns={columns} loading={loadingStatus === "loading" && true} />
            <DailyApplyDrawer
                isOpen={isEditDrawerOpen}
                handleDrawer={handleDrawer}
            />
        </>
    );
};

export default DailyAppliesTable;
