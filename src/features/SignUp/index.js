import React from "react";
import { Form, Input, Button, Avatar, message } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FormContainer, Title, Wrapper, FieldGroup } from "./styled";
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
                    <FieldGroup>
                        <Form.Item
                            name="first_name"
                            rules={[{ required: true, message: "Please input your first name!" }]}
                        >
                            <Input placeholder="First Name" />
                        </Form.Item>
                        <Form.Item
                            name="last_name"
                            rules={[{ required: true, message: "Please input your last name!" }]}
                        >
                            <Input placeholder="Last Name" />
                        </Form.Item>
                    </FieldGroup>
                    <FieldGroup>
                        <Form.Item
                            name="email"
                            rules={[{ required: true, message: "Please input your email!" }]}
                        >
                            <Input placeholder="Email" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: "Please input your password!" }]}
                        >
                            <Input.Password placeholder="Password" />
                        </Form.Item>
                    </FieldGroup>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            Sign Up
                        </Button>
                    </Form.Item>
                </Form>
                <Button type="default" onClick={handleLoginClick} block>
                    Already have an account? Login
                </Button>
            </FormContainer>
        </Wrapper>
    );
};

export default SignUpForm;
