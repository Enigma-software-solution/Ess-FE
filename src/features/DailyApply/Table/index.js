import React, { useState, useEffect } from "react";
import { Table } from 'antd';
import EditButton from 'src/components/buttons/EditButton';
import DeleteButton from 'src/components/buttons/DeleteButton';
import Header from '../Header';
import { useDispatch, useSelector } from 'react-redux';
import { getdailyAppliesApi, deteleDailyAppliesApi } from 'src/store/slices/dailyApplySlice/apis';
import { getAllDailyApplies, getLoadingStatus } from "src/store/slices/dailyApplySlice/selectors";
import DailyApplyDrawer from "../Drawer";
import { setSelectedApply } from "src/store/slices/dailyApplySlice";
import {toast } from 'react-toastify'

const DailyAppliesTable = () => {

    const dispatch = useDispatch()
    const dailyAppliesData = useSelector(getAllDailyApplies)
    const loadingStatus = useSelector(getLoadingStatus)
    const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);

    const handleEdit = (record) => {
        setIsEditDrawerOpen(true)
        dispatch(setSelectedApply(record))
        toast.success("Edited Successfully");
    };

    const handleDelete = (record) => {
        dispatch(deteleDailyAppliesApi(record._id))
        toast.success("Deleted Successfully");
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
        if (!dailyAppliesData.length) {
            dispatch(getdailyAppliesApi())
        }
    }, [])

    return (
        <>
            <Header />
            <Table dataSource={dailyAppliesData} size="small" columns={columns} loading={loadingStatus === "loading" && true}  />
            <DailyApplyDrawer
                isOpen={isEditDrawerOpen}
                handleDrawer={() => {
                    setIsEditDrawerOpen(false);
                }}
            />
        </>
    );
};

export default DailyAppliesTable;
