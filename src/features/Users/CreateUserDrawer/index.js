import React, { useEffect, useState } from 'react';
import { Form, Row, Col, Input, Select, Space, Drawer, Button, DatePicker } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { getSelectedUser } from 'src/store/slices/userSlice/selectors';
import { updateUserApi } from 'src/store/slices/userSlice/apis';
import { registerUser } from 'src/store/slices/authSlice/apis';
import CustomInput from 'src/components/formElements/CustomInput';
import { ROLES, rolesDropdown } from 'src/constant/roles';
import CustomSelect from 'src/components/formElements/CustomSelect';
import dayjs from 'dayjs'
import { getLogedInUser } from 'src/store/slices/authSlice/selectors';

const { Option } = Select;
const initialFormValues = {
    email: '',
    first_name: '',
    last_name: '',
    role: "",
    password: "",
    joining_date: dayjs()
};

const CreateUserDrawer = ({ isOpen, handleDrawer }) => {
    const authUser = useSelector(getLogedInUser);
    const loggedInUserRole = authUser.role;
    const dispatch = useDispatch();
    const selectedUser = useSelector(getSelectedUser);
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [form] = Form.useForm();
    const [fieldsEdited, setFieldsEdited] = useState(false);
    const isEditMode = !!selectedUser;

    useEffect(() => {
        if (selectedUser) {
            form.setFieldsValue({
                email: selectedUser?.email,
                first_name: selectedUser?.first_name,
                last_name: selectedUser?.last_name,
                role: selectedUser?.role
            });
        } else {
            form.setFieldsValue(initialFormValues);
        }
    }, [selectedUser, form]);

    useEffect(() => {
        const isFormEdited = form.isFieldsTouched();
        setFieldsEdited(isFormEdited);
    }, [form]);

    const onChange = (date, dateString) => {
        setSelectedDate(date)
    };
    const disabledDate = (current) => {
        return current && current > dayjs().endOf('day');
    };

    const handleSubmit = async (values) => {
        try {
            const user = {
                ...values,
                role: values.role.charAt(0).toUpperCase() + values.role.slice(1).toLowerCase()
            };

            if (isEditMode) {
                dispatch(updateUserApi({ user, userId: selectedUser?._id }));
            } else {
                dispatch(registerUser(user));
            }

            form.setFieldsValue(initialFormValues);
            setFieldsEdited(false);
            handleDrawer();
        } catch (error) {
            console.error('Form submission error:', error);
        }
    };

    const handleCancel = () => {
        form.setFieldsValue(initialFormValues);
        setFieldsEdited(false);
        handleDrawer();
    };

    return (
        <Drawer
            open={isOpen}
            onClose={handleCancel}
            width={800}
            title={isEditMode ? "Update User" : "Create User"}
        >
            <Form form={form} layout="vertical" hideRequiredMark onFinish={handleSubmit} onValuesChange={() => setFieldsEdited(true)}>
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

                {!isEditMode && (
                    <>
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
                                    rules={[{ message: 'Please enter Password' }]}
                                >
                                    <Input.Password placeholder="Please enter Password" />
                                </Form.Item>
                            </Col>
                        </Row>
                    </>
                )}

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label="Joining Date"
                            name="joining_date"
                            rules={[{ required: false }]}
                        >
                            <DatePicker
                                onChange={onChange}
                                allowClear={false}
                                defaultValue={dayjs()}
                                disabledDate={disabledDate}
                                style={{ width: '100%' }}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Roles"
                            name="role"
                            rules={[{ required: true }]}
                        >
                            <CustomInput
                                disabled={loggedInUserRole !== ROLES.ADMIN}
                                component={CustomSelect}
                                placeholder="Select Role"
                                options={rolesDropdown}
                                style={{ width: '100%' }}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item>
                    <Space>
                        <Button onClick={handleCancel}>Cancel</Button>
                        {!isEditMode ? (
                            <Button type="primary" htmlType="submit">
                                Save
                            </Button>
                        ) : (
                            <Button type="primary" htmlType="submit" disabled={!fieldsEdited}>
                                Update
                            </Button>
                        )}
                    </Space>
                </Form.Item>
            </Form>
        </Drawer>
    );
};

export default CreateUserDrawer;
