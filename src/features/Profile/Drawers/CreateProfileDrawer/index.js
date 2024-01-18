import React, { useEffect, useState } from 'react';
import { Form, Row, Col, Space, Drawer, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import CustomInput from 'src/components/formElements/CustomInput';
import { createProfileApi, updateProfileApi } from 'src/store/slices/profielSlice/apis';
import { getSelectedProfile } from 'src/store/slices/profielSlice/selectors';


const initialFormValues = {
    email: '',
    name: '',
    phoneNumber: '',
    status: '',
    state: '',
};

const CreateProfileDrawer = ({ isOpen, handleDrawer }) => {
    const dispatch = useDispatch();
    const [fieldsEdited, setFieldsEdited] = useState(false);
    const selectedProfile = useSelector(getSelectedProfile)

    const [form] = Form.useForm();
    useEffect(() => {
        if (selectedProfile) {
            form.setFieldsValue({
                email: selectedProfile?.email,
                name: selectedProfile?.name,
                phoneNumber: selectedProfile?.phoneNumber,
                status: selectedProfile?.status,
            });
        } else {
            form.setFieldsValue(initialFormValues);
        }
    }, [selectedProfile, form]);

    useEffect(() => {
        const isFormEdited = form.isFieldsTouched();
        setFieldsEdited(isFormEdited);
    }, [form]);

    const handleCancel = () => {
        form.resetFields();
        setFieldsEdited(false);
        handleDrawer();
    };

    const handleSubmit = async (values) => {
        try {
            const data = {
                ...values,
            };

            if (selectedProfile) {
                dispatch(updateProfileApi({ data, id: selectedProfile?._id }));
            } else {
                dispatch(createProfileApi(data));
            }

            form.setFieldsValue(initialFormValues);
            setFieldsEdited(false);
            handleDrawer();
        } catch (error) {
            console.error('Form submission error:', error);
        }
    };
    return (
        <Drawer open={isOpen} onClose={handleCancel} width={800}
            title={selectedProfile ? 'Update Profile' : 'Create Profile'}
        >
            <Form form={form}
                layout="vertical"
                onValuesChange={() => setFieldsEdited(true)}
                onFinish={handleSubmit}
            >
                <Row gutter={16}>
                    <Col span={12}>
                        <CustomInput
                            label="Name"
                            name="name"
                            placeholder="Please enter the name"
                            rules={[{ required: true, message: 'Please enter the name' }]}
                            type="text"
                        />
                    </Col>
                    <Col span={12}>
                        <CustomInput
                            label="Email"
                            name="email"
                            placeholder="Please enter the email"
                            rules={[{ required: true, message: 'Please enter the email' }]}

                        />
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <CustomInput
                            label="Phone Number"
                            name="phoneNumber"
                            placeholder="Please the Phone Number "
                            rules={[{ required: true, message: 'Please enter Phone Number' }]}
                            type="text"

                        />
                    </Col>
                    <Col span={12}>
                        <CustomInput
                            name="status"
                            label="status"
                            placeholder="Please select the Status"
                            rules={[{ required: true, message: 'Please select the Status' }]}
                            type="text"
                        />
                    </Col>
                    <Col span={12}>
                        <CustomInput
                            name="state"
                            label="City or State"
                            placeholder="Please select the City or State"
                            rules={[{ required: true, message: 'Please select the City or State' }]}
                            type="text"
                        />
                    </Col>
                </Row>
                <Form.Item>
                    <Space>
                        <Button onClick={handleCancel}>Cancel</Button>
                        <Button
                            type="primary"
                            htmlType="submit"
                            disabled={!fieldsEdited && !!selectedProfile}
                        >
                            {selectedProfile ? 'Update' : 'Save'}
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </Drawer>
    );
};
export default CreateProfileDrawer;
