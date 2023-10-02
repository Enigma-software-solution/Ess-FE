import React from "react";
import { Form, Input, Button, Avatar, message } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FormContainer, Title, Wrapper } from "./styled";
import { loginUser } from "src/store/slices/authSlice/apis";


const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const status = useSelector((state) => state.auth.status);

  const onFinish = async (values) => {
    try {
      const res = await dispatch(
        loginUser({ email: values.email, password: values.password })
      ).unwrap()

      console.log(res, "after unwrapResult");
      navigate("/");

      message.success("User successfully logged in");
    } catch (err) {
      message.error(err.message);
    }
  };

  const handleSignUpClick = () => {
    navigate("/signup");
  };

  return (
    <Wrapper>
      <FormContainer>
        <Avatar
          size={64}
          icon={<UserOutlined />}
          style={{ marginBottom: 24 }}
        />
        <Title>login</Title>
        <Form name="login" onFinish={onFinish}>
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

          <Form.Item>
            <Button type="link" style={{ float: "right" }}>
              Forgot password
            </Button>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={status === "loading" ? true : false}
            >
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
