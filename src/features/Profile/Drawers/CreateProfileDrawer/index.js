import React, { useEffect } from 'react';
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
};

const CreateProfileDrawer = ({ isOpen, handleDrawer }) => {
    const dispatch = useDispatch();
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
            form.setFieldsValue({
                email: initialFormValues.email,
                name: initialFormValues.name,
                phoneNumber: initialFormValues.phoneNumber,
                status: initialFormValues.status,
            });
        }
    }, [selectedProfile, form]);

    const handleSubmit = async (values) => {
        try {
            const data = {
                ...values
            }

            if (selectedProfile) {
                dispatch(updateProfileApi({ data, id: selectedProfile?._id }))
            } else {
                dispatch(createProfileApi(data));
            }

            form.setFieldsValue(initialFormValues);
            handleDrawer();
        } catch (error) {
            console.error('Form submission error:', error);
        }
    };


    return (
        <Drawer open={isOpen} onClose={handleDrawer} width={800}
            title={'Create Profile'}
        >

            <Form form={form}
                layout="vertical"
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
                            rules={[{ required: true, message: 'Please select the Status' }]}
                            type="text"
                        />
                    </Col>
                </Row>

                <Form.Item>
                    <Space>
                        <Button onClick={handleDrawer}>Cancel</Button>
                        <Button type="primary" htmlType="submit">
                            Save
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </Drawer>
    );
};

export default CreateProfileDrawer;
