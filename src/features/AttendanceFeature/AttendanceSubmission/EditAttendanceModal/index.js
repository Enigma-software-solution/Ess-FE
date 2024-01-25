import React, { useEffect, useState } from 'react';
import { Modal, Input, Form, Select, Button, Flex, TimePicker } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getSelectedAttendance } from 'src/store/slices/attendanceSlice/GetAttendanceSlice/selectors';
import { updateAttendaceApi } from 'src/store/slices/attendanceSlice/GetAttendanceSlice/api';
import { format, parseISO } from 'date-fns';
import dayjs from 'dayjs';

const { Option } = Select;

const statusOptions = [
    { value: 'present', label: 'Present' },
    { value: 'absent', label: 'Absent' },
    { value: 'late', label: 'Late' },
    { value: 'leave', label: 'Leave' },
    { value: 'half-day', label: 'Half-day' },
    { value: 'vacation', label: 'Vacation' },
];

const EditAttendanceModal = ({ visible, onClose }) => {
    const [editTime, setEditTime] = useState(null)
    const [form] = Form.useForm();

    const dispatch = useDispatch();
    const selectedAttendance = useSelector(getSelectedAttendance);

    useEffect(() => {
        form.setFieldsValue({
            firstName: selectedAttendance?.user?.first_name || '',
            lastName: selectedAttendance?.user?.last_name || '',
            checkInTime: selectedAttendance?.checkInTime
                ? dayjs(selectedAttendance.checkInTime, 'h:mm A')
                : '',
            status: selectedAttendance?.status || '',
        });
    }, [selectedAttendance]);

    const handleCancel = () => {
        form.resetFields();
        onClose();
    };

    const handleSubmit = async (values) => {
        try {
            const data = {
                id: selectedAttendance._id,
                status: values.status,
                checkInTime: editTime || values.checkInTime.format('HH:mm:ss'),
            };
            await dispatch(updateAttendaceApi(data));
            setEditTime(null)
            onClose();
        } catch (error) {
            console.error('Form submission error:', error);
        }
    };

    const handleTimeChange = (timeString) => {
        setEditTime(timeString)
    };

    return (
        <Modal
            title="Edit Attendance"
            open={visible}
            footer={null}
            onCancel={handleCancel}
        >
            <Form
                form={form}
                layout="vertical"
                initialValues={{
                    firstName: selectedAttendance?.user?.first_name || '',
                    lastName: selectedAttendance?.user?.last_name || '',
                    checkInTime: selectedAttendance?.checkInTime ? dayjs(selectedAttendance?.checkInTime, 'HH:mm:ss') : '',
                    status: selectedAttendance?.status || '',
                }}
                onFinish={handleSubmit}

            >
                <Form.Item label="First Name" name="firstName">
                    <Input disabled />
                </Form.Item>
                <Form.Item label="Last Name" name="lastName">
                    <Input disabled />
                </Form.Item>
                <Form.Item label="Check In Time" >
                    <TimePicker
                        value={editTime ? dayjs(editTime, 'HH:mm:ss') : (selectedAttendance?.checkInTime ? dayjs(selectedAttendance?.checkInTime) : null)}
                        format="h:mm A"
                        onChange={handleTimeChange}
                    />
                </Form.Item>
                <Form.Item label="Status" name="status">
                    <Select>
                        {statusOptions?.map(option => (
                            <Option key={option?.value} value={option?.value}>
                                {option.label}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
                <Flex gap={"20px"}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                    <Button onClick={handleCancel}>
                        Cancel
                    </Button>
                </Flex>

            </Form>
        </Modal>
    );
};

export default EditAttendanceModal;
