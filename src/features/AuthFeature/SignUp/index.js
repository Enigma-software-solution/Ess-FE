import React, { useState } from "react";
import { Form, Input, Button, Avatar, message } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FormContainer, Title, Wrapper, FieldGroup } from "./styled";
import { registerUser, resendConfiramtionEmail } from "src/store/slices/authSlice/apis";

const SignUpForm = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [showResendLink, setShowResendLink] = useState(false);
    const [email, setEmail] = useState('')


    const dispatch = useDispatch();
    const navigate = useNavigate();


    const onFinish = async (values) => {
        try {
            setIsLoading(true)
            const res = await dispatch(
                registerUser({
                    email: values.email,
                    password: values.password,
                    first_name: values.first_name,
                    last_name: values.last_name,
                })
            ).unwrap();

            navigate("/login");
        } catch (err) {
            if (err.status === 403) {
                setShowResendLink(true)
            }

            message.error({
                content: err.message,
                duration: 5,
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleLoginClick = () => {
        navigate("/login");
    };

    const handleResendLinkClick = async () => {
        try {
            setIsLoading(true)
            const res = await dispatch(
                resendConfiramtionEmail({ email })
            ).unwrap();

            navigate("/login");
        } catch (err) {
            message.error({
                content: err.message,
                duration: 5,
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Wrapper>
            <FormContainer>
                <Avatar size={64} icon={<UserOutlined />} style={{ marginBottom: 24 }} />
                <Title>Sign Up</Title>
                <Form name="register" onFinish={onFinish} style={{ width: '100%' }}>
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
                            <Input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: "Please input your password!" }]}
                        >
                            <Input.Password placeholder="Password" />
                        </Form.Item>
                    </FieldGroup>

                    {showResendLink && (
                        <div style={{ marginBottom: 16, textAlign: "center" }}>
                            <p>
                                Account not verified.{" "}
                                <Button type="link" onClick={handleResendLinkClick}>
                                    Resend Confirmation Link
                                </Button>
                            </p>
                        </div>
                    )}
                    <Form.Item>
                        <Button type="primary" htmlType="submit" block loading={isLoading}>
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
