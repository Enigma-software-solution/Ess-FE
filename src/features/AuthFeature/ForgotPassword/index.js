import React, { useState } from "react";
import { Form, Input, Button, Avatar, message } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FormContainer, Title, Wrapper } from "./styled";
import { forgotPasswordApi, loginUser } from "src/store/slices/authSlice/apis";
import { toast } from "react-toastify";
import { routes } from "src/constant/routes";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      setIsLoading(true);
      const res = await dispatch(
        forgotPasswordApi({ email: values.email })
      ).unwrap();

    } catch (err) {
      toast.error(err?.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = () => {
    navigate(routes.LOGIN);
  };

  return (
    <Wrapper>
      <FormContainer>
        <Avatar
          size={64}
          icon={<UserOutlined />}
          style={{ marginBottom: 24 }}
        />
        <Title>Forgot Password</Title>
        <Form name="forgot-password" onFinish={onFinish} style={{ width: '100%' }}>
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please type your email!" }]}
          >
            <Input size="large" placeholder="Email" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={isLoading}>
              Send Email
            </Button>
          </Form.Item>

          <Button
            style={{ float: "right", padding: "2px" }}
            type="link"
            onClick={handleLogin}
          >
            Login
          </Button>
        </Form>
        {/* <Button type="default" block onClick={handle}>
                    Don't have account? Signup
                </Button> */}
      </FormContainer>
    </Wrapper>
  );
};

export default ForgotPassword;
