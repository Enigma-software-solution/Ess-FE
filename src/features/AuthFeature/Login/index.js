import React, { useState } from "react";
import { Form, Input, Button, Avatar, message } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FormContainer, Title, Wrapper } from "./styled";
import { loginUser } from "src/store/slices/authSlice/apis";
import { toast } from "react-toastify";
import { routes } from "src/constant/routes";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      setIsLoading(true);
      const res = await dispatch(
        loginUser({ email: values.email, password: values.password })
      ).unwrap();
      if (res) {
        navigate("/");
      }
      setIsLoading(false);
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUpClick = () => {
    navigate("/signup");
  };

  const handleForgotPassword = () => {
    navigate(routes.FORGOT_PASSWORD);
  };

  return (
    <Wrapper>
      <FormContainer>
        <Avatar
          size={64}
          icon={<UserOutlined />}
          style={{ marginBottom: 24 }}
        />
        <Title>Login</Title>
        <Form name="login" onFinish={onFinish} style={{ width: '100%' }}>
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input size="large" placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password size="large" placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <Button
              type="link"
              style={{ float: "right", padding: "2px" }}
              onClick={handleForgotPassword}
            >
              Forgot password ?
            </Button>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={isLoading}>
              Log in
            </Button>
          </Form.Item>
        </Form>
        <Button type="default" block onClick={handleSignUpClick}>
          Don't have account? Signup
        </Button>
      </FormContainer>
    </Wrapper>
  );
};

export default LoginForm;
