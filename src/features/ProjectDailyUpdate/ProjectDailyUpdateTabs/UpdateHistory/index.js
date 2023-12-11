import { Popconfirm, Table } from 'antd';
import React from 'react'
import DeleteButton from 'src/components/buttons/DeleteButton';
import EditButton from 'src/components/buttons/EditButton';

const UpdateProjectTable = () => {

    const dataSource = [
        {
            key: '1',
            Project: 'Project 1',
            Update: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor illo repellat eos iste',
            Date: '12/8/23',
        },
        {
            key: '2',
            Project: 'Project 2',
            Update: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor illo repellat eos iste ',
            Date: '12/8/23',
        },
    ];

    const columns = [
        {
            title: 'Project',
            dataIndex: 'Project',
            key: 'Project',
        },
        {
            title: 'Update',
            dataIndex: 'Update',
            key: 'Update',
        },
        {
            title: 'Date',
            dataIndex: 'Date',
            key: 'Date',
        },
        {
            key: "action",
            title: "Action",
            dataIndex: "action",
            render: (text, record) => (
                <div className='d-flex gap-1'>
                    <EditButton />
                    <Popconfirm
                        // title="Are you sure to delete this Profile?"
                        // onConfirm={(e) => handleConfirmDelete(record, e)}
                        // onCancel={(e) => e.stopPropagation()}
                        // okText="Yes"
                        // cancelText="No"
                    >
                        <DeleteButton>Delete</DeleteButton>
                    </Popconfirm>
                </div>
            )
        },
    ];

    return (
        <div>
            <Table className='mt-4 px-5' dataSource={dataSource} columns={columns} />;
        </div>
    )
}

export default UpdateProjectTable
