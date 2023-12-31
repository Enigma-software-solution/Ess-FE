import React, { useState } from 'react';
import TextArea from 'antd/es/input/TextArea';
import Avatar from 'src/assets/avatar1.jpg';
import { CardImage, CardWrapper } from './styled';
import { ImageWrapper } from '../styled';
import Form from 'antd/es/form/Form';
import format from 'date-fns/format';
import { Button, Select, TimePicker } from 'antd';
import { toast } from 'react-toastify';
import { capitalize } from 'lodash';
import { useForm } from 'antd/lib/form/Form';
import { getTime } from 'date-fns';
import dayjs from 'dayjs';

const { Option } = Select;

const STATUS_OPTIONS = [
    { value: 'present', label: 'Present' },
    { value: 'absent', label: 'Absent' },
    { value: 'late', label: 'Late' },
    { value: 'leave', label: 'Leave' },
    { value: 'half-day', label: 'Half-day' },
    { value: 'vacation', label: 'Vacation' },
];

const MarkCard = ({ user, isLoading, handleSubmit, attendanceDate }) => {
    const [form] = useForm();
    const [checkInTime, setCheckInTime] = useState(new Date());

    const onSubmit = async (values) => {
        if (!values.status) {
            return toast.warn('Status is required');
        }
        const date = format(attendanceDate, 'yyyy-MM-dd');
        const time = format(new Date(checkInTime), 'HH:mm:ss'); // Extract time from checkInTime
        const combinedCheckInTime = new Date(`${date}T${time}`);

        const data = {
            user: user?._id,
            date: date,
            status: values?.status,
            checkInTime: ['late', 'present', 'half-day'].includes(values?.status)
                ? combinedCheckInTime
                : null,
            notes: values?.notes,
        };

        try {
            await handleSubmit(data);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <CardWrapper>
            <ImageWrapper>
                <CardImage src={user?.profile_pic ?? Avatar} alt="Avatar" />
            </ImageWrapper>
            <h5 className="text-center pt-3 pb-4">
                {capitalize(user?.first_name) + ' ' + capitalize(user?.last_name)}
            </h5>
            <Form form={form} onFinish={onSubmit}>
                <Form.Item name="checkInTime">
                    <TimePicker
                        style={{ width: '100%' }}
                        placeholder="Select Time"
                        use12Hours
                        format="h:mm a"
                        size="large"
                        onChange={(time) => setCheckInTime(time)}
                        defaultValue={dayjs(checkInTime)}
                    />
                </Form.Item>
                <Form.Item name="status">
                    <Select
                        placeholder="Select Status"
                        dropdownStyle={{ background: '#e4eefc', fontSize: '25px' }}
                        showSearch
                        size="large"
                        options={STATUS_OPTIONS}
                        rules={[{ required: true, message: 'Please select a status!' }]}
                    />
                </Form.Item>

                <Form.Item name="notes">
                    <TextArea rows={3} placeholder="Notes" />
                </Form.Item>
                <Button htmlType="submit" type="primary" disabled={isLoading}>
                    Submit
                </Button>
            </Form>
        </CardWrapper>
    );
};

export default MarkCard;
