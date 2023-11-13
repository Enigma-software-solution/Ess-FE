// DetailsModal.js
import React, { useEffect } from 'react';
import { Modal, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUserAttendanceById } from 'src/store/slices/attendanceSlice/GetAttendanceSlice/api';

const SingleUserModal = ({ visible, handleCancel, record }) => {

    const dispatch = useDispatch()
    let { id } = useParams();

    useEffect(() => {
        dispatch(getUserAttendanceById(id))
    }, [])

    return (
        <Modal
            title={`Details for ${record.first_name}`}
            visible={visible}
            onCancel={handleCancel}
            footer={[
                <Button key="close" onClick={handleCancel}>
                    Close
                </Button>,
            ]}
        >
            <p>Email: {record.email}</p>
            {/* Add other details you want to display in the modal */}
        </Modal>
    );
};

export default SingleUserModal;
