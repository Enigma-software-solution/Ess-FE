import React, { useEffect } from 'react';
import { Row } from 'antd';
import { StyledGraphColumn, StyledGraphRow, StyledUserColumn } from './styled';
import ViewUser from './ViewUser';
import ViewUserAttendenceGraph from './ViewUserGraph';
import { useDispatch } from 'react-redux';
import { getUserAttendanceById } from 'src/store/slices/attendanceSlice/GetAttendanceSlice/api';
import { useParams } from 'react-router-dom';

const AttendenceDetails = () => {

    const dispatch = useDispatch()
    let { id } = useParams();

    useEffect(() => {
        dispatch(getUserAttendanceById(id))
    }, [])


    return (
        <div style={{ cursor: 'pointer' }}>
            <StyledGraphRow gutter={8} >
                <StyledUserColumn span={6}><ViewUser /></StyledUserColumn>
                <StyledGraphColumn span={17}><ViewUserAttendenceGraph /></StyledGraphColumn>
            </StyledGraphRow>
        </div>
    );
};

export default AttendenceDetails;
