import React, { useEffect } from 'react';
import { Modal, Input, Form, Select, Button, Flex } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getSelectedAttendance } from 'src/store/slices/attendanceSlice/GetAttendanceSlice/selectors';
import { updateAttendaceApi } from 'src/store/slices/attendanceSlice/GetAttendanceSlice/api';

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
    const [form] = Form.useForm();

    const dispatch = useDispatch();
    const selectedAttendance = useSelector(getSelectedAttendance);

    useEffect(() => {
        // Set initial values when selectedAttendance changes
        form.setFieldsValue({
            firstName: selectedAttendance?.user?.first_name || '',
            lastName: selectedAttendance?.user?.last_name || '',
            checkInTime: selectedAttendance?.checkInTime || '',
            status: selectedAttendance?.status || '',
        });
    }, [selectedAttendance]);

    const handleCancel = () => {
        form.resetFields();
        onClose();
    };

    const handleSubmit = async (value) => {
        try {
            const data = {
                id: selectedAttendance._id,
                status: value.status,
            };
            await dispatch(updateAttendaceApi(data));
            onClose();
        } catch (error) {
            console.error('Form submission error:', error);
        }
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
                    checkInTime: selectedAttendance?.checkInTime || '',
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
                <Form.Item label="Check In Time" name="checkInTime">
                    <Input disabled />
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
