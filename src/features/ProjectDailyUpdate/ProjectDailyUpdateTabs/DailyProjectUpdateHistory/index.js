import { Table } from 'antd';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getDailyProjectUpdateApi } from 'src/store/slices/projectDailyUpdates/apis';
import { getAllProjectDailyUpdates } from 'src/store/slices/projectDailyUpdates/selectors';
import format from 'date-fns/format';
import ProjectUpdateCard from './Card';

const UpdateProjectTable = () => {

    const dispatch = useDispatch()
    const allProjectsDailyUpdatesData = useSelector(getAllProjectDailyUpdates)
    const dailyUpdates = allProjectsDailyUpdatesData?.dailyUpdates


    useEffect(() => {
        dispatch(getDailyProjectUpdateApi())
    }, [])



    const columns = [
        {
            title: 'Project Name',
            dataIndex: 'project',
            key: 'Project',
            render: (text, record) => record?.project?.clientName || 'No client name',
        },
        {
            title: 'Project Manager',
            dataIndex: 'Project Manager',
            key: 'Project Manager',
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
    ];


    return (
        <div className='mt-4 px-5'>
            {dailyUpdates &&   <ProjectUpdateCard record={dailyUpdates} />}
            <br /> <br /> <br />
            <Table dataSource={dailyUpdates} columns={columns} />;
        </div>
    )
}

export default UpdateProjectTable
