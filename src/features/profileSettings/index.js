// ProfileSettings.jsx
import React, { useEffect, useState } from "react";
import { Form, Input, Button, Avatar } from "antd";
import { UserOutlined, MailOutlined, IdcardOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "src/store/slices/authSlice/apis";
import { getLogedInUser } from "src/store/slices/authSlice/selectors";

const Wrapper = styled.div`
  max-width: 600px;
  margin:40px auto;
  padding: 20px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  text-align: center;
`;

const ProfileSettings = () => {
  const [form] = Form.useForm();
  const [profilePic, setProfilePic] = useState('');
  const dispatch = useDispatch();

  const loggedInUser = useSelector(getLogedInUser)

  useEffect(() => {
    const initialValuesData = {
      firstName: loggedInUser?.first_name,
      lastName: loggedInUser?.last_name,
      email: loggedInUser?.email,
      role: loggedInUser?.role,
    };
    form.setFieldsValue(initialValuesData);
  }, [loggedInUser, form]);

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      if (!file) {
        reject(new Error("No file provided"));
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result);
      };

      reader.onerror = () => {
        reject(new Error("Error reading file"));
      };

      reader.readAsDataURL(file);
    });
  };

  const handleProfilePicChange = async (e) => {
    try {
      const file = e.target.files[0];
      if (file) {
        const base64String = await fileToBase64(file);
        setProfilePic(base64String);
      }
    } catch (error) {
      console.error("Error converting file to base64:", error.message);
    }
  };

  const saveChanges = (values) => {
    console.log("Saving changes...", loggedInUser.id);

    const data = {
      userId: loggedInUser?.id,
      user: {
        first_name: values.firstName,
        last_name: values.lastName,
        profile_pic: profilePic,
      },
    };
    dispatch(updateUser(data));
  };

  if (!loggedInUser?.id) return <h1>Loading...</h1>

  return (
    <Wrapper>
      <label htmlFor="avatar-upload">
        <Avatar
          size={100}
          src={profilePic}
          icon={<UserOutlined />}
          style={{ cursor: "pointer" }}
        />
      </label>
      <Input
        id="avatar-upload"
        type="file"
        accept="image/*"
        className="d-none m-3"
        onChange={handleProfilePicChange}
      />

      <Form
        form={form}
        className="mt-4"
        onFinish={saveChanges}
      >
        <Form.Item name="firstName">
          <Input prefix={<UserOutlined />} placeholder="First Name" />
        </Form.Item>
        <Form.Item name="lastName">
          <Input prefix={<IdcardOutlined />} placeholder="Last Name" />
        </Form.Item>
        <Form.Item name="email">
          <Input prefix={<MailOutlined />} type="email" placeholder="Email" readOnly disabled />
        </Form.Item>
        <Form.Item name="role">
          <Input prefix={<IdcardOutlined />} placeholder="Role" readOnly disabled />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save Changes
          </Button>
        </Form.Item>
      </Form>
    </Wrapper>
  );
};

export default ProfileSettings;
