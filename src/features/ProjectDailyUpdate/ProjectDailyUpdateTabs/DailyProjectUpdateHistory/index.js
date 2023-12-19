import { Popconfirm, Table } from 'antd';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import DeleteButton from 'src/components/buttons/DeleteButton';
import EditButton from 'src/components/buttons/EditButton';
import { deteleDailyProjectUpdatesApi, getDailyProjectUpdateApi } from 'src/store/slices/projectDailyUpdates/apis';
import { getAllProjectDailyUpdates } from 'src/store/slices/projectDailyUpdates/selectors';
import format from 'date-fns/format';
import EditProjectDailyUpdateDrawer from './EditDailyProjectUpdateHistory';
import { setSelectedProjectDailyUpdate } from 'src/store/slices/projectDailyUpdates';

const UpdateProjectTable = () => {
    const [editDrawerVisible, setEditDrawerVisible] = useState(false);
    // const [recordToEdit, setRecordToEdit] = useState(null);

    const dispatch = useDispatch()
    const allProjectsDailyUpdatesData = useSelector(getAllProjectDailyUpdates)

    useEffect(() => {
        dispatch(getDailyProjectUpdateApi())
    }, [])

    const handleConfirmDelete = (recordToDelete, e) => {
        dispatch(deteleDailyProjectUpdatesApi(recordToDelete?._id))
    };

    const handleClick = (record, e) => {
        console.log(record, "recordToEdit")
        e.stopPropagation();
        dispatch(setSelectedProjectDailyUpdate(record))
        // setRecordToEdit(recordToEdit);
        setEditDrawerVisible(true);
    }

    const columns = [
        {
            title: 'Project Name',
            dataIndex: 'project',
            key: 'Project',
            render: (text, record) => record.project?.clientName || 'No client name',
        },
        {
            title: 'Project Manager',
            dataIndex: 'Project Manager',
            key: 'Project Manager',
            render: (text, record) => {
                const projectManager = record.project?.projectManager;
                if (projectManager && projectManager.first_name && projectManager.last_name) {
                    return `${projectManager.first_name} ${projectManager.last_name}`;
                } else {
                    return 'No project manager';
                }
            },
        },
        {
            title: 'Update',
            dataIndex: 'content',
            key: 'Update',
            render: (text, record) => (
                <span dangerouslySetInnerHTML={{ __html: record.content }} />
            ),
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'Date',
            render: (text, record) => {
                const formattedDate = format(new Date(record?.date), 'MM/dd/yyyy');
                return formattedDate;
            },
        },
        {
            key: "action",
            title: "Action",
            dataIndex: "action",
            render: (text, record) => (
                <div className='d-flex gap-1'>
                    <EditButton onClick={(e) => handleClick(record, e)} />
                    <Popconfirm
                        title="Are you sure to delete this client?"
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

    return (
        <div>
            <Table className='mt-4 px-5' dataSource={allProjectsDailyUpdatesData} columns={columns} />;
            <EditProjectDailyUpdateDrawer
                visible={editDrawerVisible}
                onClose={() => setEditDrawerVisible(false)}
            />
        </div>
    )
}

export default UpdateProjectTable
