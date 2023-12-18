import React from 'react';
import TextArea from 'antd/es/input/TextArea';
import Avatar from 'src/assets/avatar1.jpg';
import { CardImage, CardWrapper } from './styled';
import { ImageWrapper } from '../styled';
import Form from 'antd/es/form/Form';
import format from 'date-fns/format';
import { Button, Select } from 'antd';
import { toast } from 'react-toastify';

const STATUS_OPTIONS = [
    { value: 'present', label: 'Present' },
    { value: 'absent', label: 'Absent' },
    { value: 'late', label: 'Late' },
    { value: 'leave', label: 'Leave' },
    { value: 'half-day', label: 'Half-day' },
    { value: 'vacation', label: 'Vacation' },
];
const MarkCard = ({ user, isLoading, handleSubmit }) => {
    const [form] = Form.useForm();
    const capitalizeFirstLetter = (name) => {
        return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    };
    const onSubmit = async (values) => {
        if (!values.status) {
            return toast.warn('Status is required');
        }
        const attendanceDate = format(new Date(), 'yyyy-MM-dd');
        const attendanceTime = new Date();
        const data = {
            user: user?._id,
            date: attendanceDate,
            status: values?.status,
            checkInTime: ['late', 'present', 'half-day'].includes(values?.status) ? attendanceTime : null,
            notes: values?.notes,
        };
        try {
            await handleSubmit(data);
        } catch (err) {
            console.log(err);
        }
    };
    const formattedName = `${capitalizeFirstLetter(user?.first_name)} ${capitalizeFirstLetter(user?.last_name)}`;
    return (
        <CardWrapper>
            <ImageWrapper>
                <CardImage src={user?.profile_pic ?? Avatar} alt="Avatar" />
            </ImageWrapper>
            <h5 className="text-center pt-3 pb-4">
                {formattedName}
            </h5>
            <Form form={form} onFinish={onSubmit}>
                <Form.Item name="status" >
                    <Select
                        placeholder='Select Status'
                        dropdownStyle={{ background: '#e4eefc', fontSize: '25px' }}
                        showSearch
                        size="large"
                        options={STATUS_OPTIONS}
                        rules={[{ required: true, message: 'Please select a status!' }]}
                    />
                </Form.Item>
                <Form.Item name="notes">
                    <TextArea rows={3} placeholder='Notes' />
                </Form.Item>
                <Button
                    htmlType='submit'
                    type="primary"
                    disabled={isLoading}
                >
                    Submit
                </Button>
            </Form>
        </CardWrapper>
    );
};
export default MarkCard;
