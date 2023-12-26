// ProfileSettings.jsx
import React, { useEffect, useState } from "react";
import { Form, Input, Button, Avatar } from "antd";
import { UserOutlined, MailOutlined, IdcardOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "src/store/slices/authSlice/apis";
import { getLogedInUser } from "src/store/slices/authSlice/selectors";
import Loader from "src/components/Loader";

const Wrapper = styled.div`
  max-width: 600px;
  margin: 40px auto;
  padding: 20px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  text-align: center;
`;

const ProfileSettings = () => {
  const [form] = Form.useForm();
  const [profilePic, setProfilePic] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
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
    setPreviewUrl(loggedInUser?.profile_pic)

  }, [loggedInUser, form]);

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    setProfilePic(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const saveChanges = async (values) => {
    const formData = new FormData();

    // Append the profile picture to the formData if it exists
    if (profilePic) {
      formData.append('file', profilePic); // Use the correct field name expected by multer
    }

    // Append other user data to the formData
    formData.append('userId', loggedInUser?.id);
    formData.append('user[first_name]', values.firstName);
    formData.append('user[last_name]', values.lastName);

    try {
      const response = await dispatch(updateUser(formData));
      // Handle the response if needed
    } catch (error) {
      // Handle errors if needed
    }
  };

  if (!loggedInUser?.id) return <Loader />

  return (
    <Wrapper>
      <label htmlFor="avatar-upload">
        <Avatar
          size={100}
          icon={<UserOutlined />}
          src={previewUrl || undefined} // Use the preview URL if available
          style={{ cursor: "pointer" }}
        />
      </label>
      <input
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
