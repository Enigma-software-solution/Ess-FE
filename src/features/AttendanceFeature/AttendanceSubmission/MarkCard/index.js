import React from 'react'
import TextArea from "antd/es/input/TextArea";
import Avatar from 'src/assets/avatar.jpg'
import { CardImage, CardWrapper } from './styled';
import { ImageWrapper } from '../styled';
import Form from 'antd/es/form/Form';
import format from 'date-fns/format';
import { Button, Select } from 'antd';


const STATUS_OPTIONS = [
    { value: "present", label: "Present" },
    { value: "absent", label: "Absent" },
    { value: "late", label: "Late" },
    { value: "leave", label: "Leave" },
    { value: "half-day", label: "Half-day" },
    { value: "vacation", label: "Vacation" },
];


const MarkCard = ({ user, isLoading, handleSubmit }) => {
    const DATE_FORMAT = 'yyyy-MM-dd';

    const [form] = Form.useForm();

    const onSubmit = async (values) => {

        const data = {
            user: user?._id,
            date: format(new Date(), DATE_FORMAT),
            status: values?.status,
            checkInTime: ['late', 'present', 'half-day'].includes(values?.status) ? new Date() : null,
            notes: values?.notes,
        };

        try {
            await handleSubmit(data);
        }
        catch (err) {
            console.log(err);
        }
    };


    const initialValues = {
        status: "present",
        notes: '',
    };

    return (
        <CardWrapper>
            <ImageWrapper>
                <CardImage src={Avatar} alt="Avatar" />
            </ImageWrapper>

            <h5 className="text-center pt-3 pb-4">
                {user?.first_name} {user?.last_name}
            </h5>

            <Form form={form} initialValues={initialValues} onFinish={onSubmit}>
                <Form.Item name="status">
                    <Select
                        dropdownStyle={{ background: "#e4eefc", fontSize: "25px" }}
                        showSearch
                        size="large"
                        options={STATUS_OPTIONS}
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
    )
}

export default MarkCard