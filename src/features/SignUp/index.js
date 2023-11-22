import React from "react";
import { Form, Input, Button, Avatar, message, Flex } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FormContainer, Title, Wrapper } from "./styled";
import { registerUser } from "src/store/slices/authSlice/apis";

const SignUpForm = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onFinish = async (values) => {
        try {
            const res = await dispatch(
                registerUser({
                    email: values.email,
                    password: values.password,
                    first_name: values.first_name,
                    last_name: values.last_name,
                    phoneNumber: values.phoneNumber,
                })
            ).unwrap();

            navigate("/login");
            message.success("User registered successfully");
        } catch (err) {
            message.error(err.message);
        }
    };

    const handleLoginClick = () => {
        navigate("/login");
    };

    return (
        <Wrapper>
            <FormContainer>
                <Avatar size={64} icon={<UserOutlined />} style={{ marginBottom: 24 }} />
                <Title>Sign Up</Title>
                <Form name="register" onFinish={onFinish}>
                    <Form.Item
                        label="First Name"
                        name="first_name"
                        rules={[{ required: true, message: "Please input your first name!" }]}
                    >
                        <Input placeholder="First Name" />
                    </Form.Item>
                    <Form.Item
                        label="Last Name"
                        name="last_name"
                        rules={[{ required: true, message: "Please input your last name!" }]}
                    >
                        <Input placeholder="Last Name" />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: "Please input your email!" }]}
                    >
                        <Input placeholder="Email" />
                    </Form.Item>
                    <Form.Item
                        label="Phone Number"
                        name="phoneNumber"
                        rules={[{ message: "Please input your Phone Number" }]}
                    >
                        <Input type="Number" placeholder="Phone Number" />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: "Please input your password!" }]}
                    >
                        <Input.Password placeholder="Password" />
                    </Form.Item>
                    <Form.Item
                        label="Confirm Password"
                        name="confirmPassword"
                        rules={[
                            { required: true, message: 'Please confirm your password!' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('The two passwords do not match!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password placeholder="Confirm Password" />
                    </Form.Item>
                    <Flex style={{
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '10px'
                    }}>
                        <Button type="primary" htmlType="submit" block>
                            Sign Up
                        </Button>
                        <Button type="default" onClick={handleLoginClick} block>
                            Already have an account? Login
                        </Button>
                    </Flex>
                </Form>
            </FormContainer>
        </Wrapper>
    );
};

export default SignUpForm;
