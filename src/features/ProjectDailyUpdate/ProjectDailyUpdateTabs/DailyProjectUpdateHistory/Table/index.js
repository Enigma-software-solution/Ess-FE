import React from 'react';
import { Table } from 'antd';
import { format } from 'date-fns';
import { StyledTable } from './styled';
import ProjectUpdateCard from '../Card';

const UpdateHistory = ({ reports }) => {
    const groupedReports = reports?.reduce((acc, report) => {
        const ProjectName = `${report?.project?.clientName}`;
        if (!acc[ProjectName]) {
            acc[ProjectName] = [];
        }
        acc[ProjectName]?.push(report);
        return acc;
    }, {});
    
    const groupedData = Object.keys(groupedReports)?.map((name) => ({
        key: name,
        clientName: name,
        UpdateHistory: groupedReports[name],
    }));

    const expandedRowRender = (record) => (
        <>
          
                <ProjectUpdateCard record={record.UpdateHistory} />
    
        </>
    );

    const columns = [
        {
            title: 'Project Name',
            dataIndex: 'clientName',
        },
    ];

    return (
        <div>
        <StyledTable
            columns={columns}
            expandable={{
                expandedRowRender,
                rowExpandable: () => true,
            }}
            dataSource={groupedData}
           
        />
        </div>
    );
};

export default UpdateHistory;
