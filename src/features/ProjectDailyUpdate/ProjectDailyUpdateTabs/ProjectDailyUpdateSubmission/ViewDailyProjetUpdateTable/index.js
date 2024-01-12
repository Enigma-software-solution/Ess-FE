import { Popconfirm, Table } from 'antd';
import format from 'date-fns/format';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import DeleteButton from 'src/components/buttons/DeleteButton';
import EditButton from 'src/components/buttons/EditButton';
import { deteleDailyProjectUpdatesApi, getDailyProjectUpdateApi } from 'src/store/slices/projectDailyUpdates/apis';
import qs from 'qs'
import { getLogedInUser } from 'src/store/slices/authSlice/selectors';

const ViewDailyProjectUpdateTable = ({todayAllUpdates}) => {

    const dispatch = useDispatch()

    const authUser = useSelector(getLogedInUser)

    const handleConfirmDelete = (recordToDelete, e) => {
        dispatch(deteleDailyProjectUpdatesApi(recordToDelete?._id))
    };

    const handleClick = (record, e) => {

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
            dataIndex: 'ProjectManager',
            key: 'ProjectManager',
            render: (text, record) => {
                const projectManager = record.project?.projectManager;
                if (projectManager && projectManager?.first_name && projectManager?.last_name) {
                    return `${projectManager?.first_name} ${projectManager?.last_name}`;
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
                <span dangerouslySetInnerHTML={{ __html: record?.content }} />
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
            key: 'action',
            title: 'Action',
            dataIndex: 'action',
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
            ),
        },
    ];

    useEffect(() => {
        const params = qs.stringify({
            date: new Date(),
            user: authUser?.id
        })
        dispatch(getDailyProjectUpdateApi(params))
    }, [])


    return (

        <Table className='mt-4 px-5' dataSource={todayAllUpdates} columns={columns} />
    )
}

export default ViewDailyProjectUpdateTable