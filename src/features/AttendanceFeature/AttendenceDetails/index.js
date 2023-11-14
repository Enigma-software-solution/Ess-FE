import React, { useEffect } from 'react';
import ViewUserAttendenceGraph from './ViewUserGraph';
import { useDispatch } from 'react-redux';
import { getUserAttendanceById } from 'src/store/slices/attendanceSlice/GetAttendanceSlice/api';
import { useParams } from 'react-router-dom';
import SingleUserAttendanceDetails from './SingleUserAttendanceDetails';
import { StyledDetails, StyledDetailsTable } from './styled';

const AttendenceDetails = () => {

    const dispatch = useDispatch()
    let { id } = useParams();


    useEffect(() => {
        dispatch(getUserAttendanceById(id))
    }, [])


    return (
        <StyledDetails>
            <StyledDetailsTable> <SingleUserAttendanceDetails userId={id} /></StyledDetailsTable>
            <div><ViewUserAttendenceGraph /></div>
        </StyledDetails>
    );
};

export default AttendenceDetails;
