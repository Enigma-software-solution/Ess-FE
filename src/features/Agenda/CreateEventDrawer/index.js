import React, { useState } from 'react';
// import { setSelectedEvent } from '@/app/store/slices/agenda';
import { Button, Form, Input, Select } from 'antd';
import { format } from 'date-fns';
import { useDispatch } from 'react-redux';
import {Drawer} from 'antd';
const { Option } = Select;




const CreateEventDrawer= ({ selectedDate, isDrawerOpen, handleDrawerClose }) => {
    const [form] = Form.useForm();

    const dispatch = useDispatch()


    const handleReset = () => {
        form.resetFields(); // Reset all form fields
    };

    const handleAddEvent = (values) => {
        const preparedData = {
            ...selectedDate,
            ...values
        }
        // dispatch(setSelectedEvent(preparedData))
        handleReset()
        handleDrawerClose()
        console.log('Submitted values:', values);
    };

    return (
        <Drawer
            title="Add Event"
            placement="right"
            closable={true}
            onClose={handleDrawerClose}
            open={isDrawerOpen}
            width={600}
        >
            <Form name="event-form" labelCol={{ span: 8 }} wrapperCol={{ span: 12 }} onFinish={handleAddEvent} form={form}>
                <div className="d-flex justify-content-end align-items-end flex-column  mb-1">
                    <p>Date: {format(new Date(selectedDate?.start), 'dd-MM-yyyy')}</p>
                    <p>
                        Time: {format(new Date(selectedDate.start), 'p')} -{' '}
                        {format(new Date(selectedDate.end), 'p')}
                    </p>
                </div>
                <Form.Item name="eventName" label="Event Name" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="companyName" label="Company Name" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="numOfGuests" label="Number of Guests" rules={[{ required: true }]}>
                    <Input type="number" />
                </Form.Item>
                <Form.Item name="guests" label="Guest Names with Emails">
                    <Input.TextArea />
                </Form.Item>
                <Form.Item name="callType" label="Call Type" rules={[{ required: true }]}>
                    <Select>
                        <Option value="initialCall">Initial Call</Option>
                        <Option value="techCall">Tech Call</Option>
                    </Select>
                </Form.Item>
                <Form.Item name="callPlatform" label="Call Platform" rules={[{ required: true }]}>
                    <Select>
                        <Option value="zoom">Zoom</Option>
                        <Option value="zoom">Google Meet</Option>
                        <Option value="teams">Microsoft Teams</Option>
                    </Select>
                </Form.Item>
                <Form.Item name="initialConversation" label="Initial Conversation" >
                    <Input.TextArea />
                </Form.Item>
                <Form.Item name="companyInformation" label="Company Information" >
                    <Input.TextArea />
                </Form.Item>
                <Form.Item className='d-flex justify-content-end'>
                    <Button type="primary" htmlType="submit">
                        Add Event
                    </Button>
                </Form.Item>
            </Form>
        </Drawer>
    );
};

export default CreateEventDrawer;
