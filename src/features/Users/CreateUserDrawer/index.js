import React, { useEffect, useState } from 'react';
import { Form, Row, Col, Input, Select, Space, Drawer, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { getSelectedUser } from 'src/store/slices/userSlice/selectors';
import { updateUserApi } from 'src/store/slices/userSlice/apis';
import { registerUser } from 'src/store/slices/authSlice/apis';


const { Option } = Select;

const initialFormValues = {
    email: '',
    first_name: '',
    last_name: '',
    role: "",
    password: ""
};

const CreateUserDrawer = ({ isOpen, handleDrawer }) => {

    const dispatch = useDispatch();
    const selectedUser = useSelector(getSelectedUser)

    const [form] = Form.useForm();

    useEffect(() => {
        if (selectedUser) {
            form.setFieldsValue({
                email: selectedUser?.email,
                first_name: selectedUser?.first_name,
                last_name: selectedUser?.last_name,
                password: selectedUser?.password,
            });
        } else {
            form.setFieldsValue({
                email: initialFormValues.email,
                first_name: initialFormValues.first_name,
                last_name: initialFormValues.last_name,
                password: initialFormValues.password,
            });
        }
    }, [selectedUser, form]);


    const handleSubmit = async (values) => {
        try {
            const data = {
                ...values
            }

            if (selectedUser) {
                dispatch(updateUserApi({ data, id: selectedUser?._id }))
            } else {
                dispatch(registerUser(data));
            }

            form.setFieldsValue(initialFormValues);
            handleDrawer();
        } catch (error) {
            console.error('Form submission error:', error);
        }
    };


    return (
        <Drawer open={isOpen} onClose={handleDrawer} width={800}
            title={"Create User"}
        >

            <Form form={form} layout="vertical" hideRequiredMark onFinish={handleSubmit} >
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="first_name"
                            label="First Name"
                            rules={[{ required: true, message: 'Please enter First Name' }]}
                        >
                            <Input placeholder="Please enter First Name" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="last_name"
                            label="Last Name"
                            rules={[{ required: true, message: 'Please enter Last Name' }]}
                        >
                            <Input placeholder="Please enter Last Name" />
                        </Form.Item>
                    </Col>

                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="email"
                            label="Email"
                            rules={[{ required: true, message: 'Please enter Email' }]}
                        >
                            <Input placeholder="Please enter Email" />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            name="password"
                            label="Password"
                            rules={[{ required: true, message: 'Please enter Password' }]}
                        >
                            <Input.Password placeholder="Please enter Password" />

                        </Form.Item>

                    </Col>

                </Row>

                <Form.Item>
                    <Space>
                        <Button onClick={handleDrawer} >Cancel</Button>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </Drawer >
    );
};

export default CreateUserDrawer;
