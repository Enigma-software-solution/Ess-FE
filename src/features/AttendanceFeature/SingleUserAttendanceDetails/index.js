import React from 'react';
import ViewUserAttendenceGraph from './ViewUserGraph';
import { useParams } from 'react-router-dom';
import { StyledDetailsTable } from './styled';
import UserStats from './UserStats';
import { Divider, Flex, Space } from 'antd';
import SingleUserAttendancTable from './SingleUserAttendanceTable';

const AttendenceDetails = () => {

    let { id } = useParams();

    return (
        <>
            <h4 style={{ color: '#4154F1', marginBottom: '10px' }}>Reports</h4>
            <Flex>
                <Space size={130} >
                    <UserStats userId={id} />
                    <ViewUserAttendenceGraph />
                </Space>
            </Flex>
            <Divider />
            <StyledDetailsTable>
                <SingleUserAttendancTable userId={id} />
            </StyledDetailsTable>
        </>
    );
};

export default AttendenceDetails;
