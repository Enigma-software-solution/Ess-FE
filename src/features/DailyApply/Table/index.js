import React,{ useEffect } from "react";

import { Table } from 'antd';
import { mockData } from './MockData';
import EditButton from 'src/components/buttons/EditButton';
import DeleteButton from 'src/components/buttons/DeleteButton';
import Header from '../Header';
import { useDispatch } from 'react-redux';
import { dailyApplies } from 'src/store/slices/dailyApplySlice/apis';

const CustomTable = () => {

    const dispatch=useDispatch()

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
            dataIndex: "name",
        },
        {
            key: "email",
            title: "Email",
            dataIndex: "email",
        },

        {
            key: "phone",
            title: "Phone Number",
            dataIndex: "phone",
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
      dispatch(dailyApplies())
    }, [])
    

    return (
        <>
            <Header />
            <div style={{height:'70vh'}}>
                <Table dataSource={mockData} columns={columns} />
            </div>
        </>
    );
};

export default CustomTable;
