import React, { useState, useEffect } from "react";
import { Form, Input, Button, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { FormContainer, Title, Wrapper } from "./styled";
import { ResetPasswordApi, loginUser } from "src/store/slices/authSlice/apis";
import { toast } from "react-toastify";
import { routes } from "src/constant/routes";

const ResetPassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { token } = useParams(); // Get the token from the URL parameters
    const [isLoading, setIsLoading] = useState(false);

    const onFinish = async (values) => {
        try {
            setIsLoading(true);

            // Check if password and confirm password match
            if (values.password !== values.confirm_password) {
                toast.error("Password and confirm password do not match");
                return;
            }

            // Use the token in your API call if needed
            const res = await dispatch(ResetPasswordApi({ password: values.password, token: token })).unwrap()


            if (res) {
                navigate("/");
            }
        } catch (err) {
            toast.error(err?.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogin = () => {
        navigate(routes.LOGIN)
    }

    return (
        <Wrapper>
            <FormContainer>
                <Avatar size={64} icon={<UserOutlined />} style={{ marginBottom: 24 }} />
                <Title>Reset Password</Title>
                <Form name="resetPassword" onFinish={onFinish}>
                    {/* Your form components */}
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: "Please input your password!" }]}
                    >
                        <Input.Password placeholder="Password" />
                    </Form.Item>

                    <Form.Item
                        name="confirm_password"
                        rules={[
                            { required: true, message: "Please input your confirm password!" },

                        ]}
                    >
                        <Input.Password placeholder="Confirm Password" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" block loading={isLoading}>
                            Reset
                        </Button>

                    </Form.Item>
                    <Button type="link"  onClick={handleLogin}>
                        Login
                    </Button>
                </Form>
            </FormContainer>
        </Wrapper>
    );
};

export default ResetPassword;
