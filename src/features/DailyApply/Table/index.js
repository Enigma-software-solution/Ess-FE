import React,{ useEffect } from "react";
import { Table } from 'antd';
import EditButton from 'src/components/buttons/EditButton';
import DeleteButton from 'src/components/buttons/DeleteButton';
import Header from '../Header';
import { useDispatch, useSelector } from 'react-redux';
import { getdailyApplies } from 'src/store/slices/dailyApplySlice/apis';
import { getAllDailyApplies } from "src/store/slices/dailyApplySlice/selectors";

const CustomTable = () => {

    const dispatch = useDispatch()

    const dailyAppliesData = useSelector(getAllDailyApplies)

    const handleEdit = (record) => {
        // Implement your edit logic here
        console.log("Edit clicked for:", record);
    };

    const handleDelete = (record) => {
        // Implement your delete logic here
        console.log("Delete clicked for:", record);
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
      dispatch(getdailyApplies())
    }, [])

    return (
        <>
            <Header />
            <div>
                <Table dataSource={dailyAppliesData} columns={columns} />
            </div>
        </>
    );
};

export default CustomTable;
