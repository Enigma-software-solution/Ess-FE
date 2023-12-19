import React from 'react';
import { Drawer, Form, Input, Button } from 'antd';
import { useSelector } from 'react-redux';
import { getSelectedProjectDailyUpdates } from 'src/store/slices/projectDailyUpdates/selectors';

const EditProjectDailyUpdateDrawer = ({ visible, onClose }) => {

    const selectedProjectDailyUpdate = useSelector(getSelectedProjectDailyUpdates)

    console.log(selectedProjectDailyUpdate, "selectedProjectDailyUpdate");


    const [form] = Form.useForm();

    const onFinish = (values) => {
        // Handle the form submission here
        console.log('Received values:', values);
        onClose(); // Close the drawer after form submission
    };

    console.log(selectedProjectDailyUpdate, "record")

    return (
        <Drawer
            title="Edit Project"
            visible={visible}
            onClose={onClose}
            width={400}
            destroyOnClose={true}
        >
            <Form form={form} onFinish={onFinish} layout="vertical">
                <Form.Item
                    name="projectName"
                    label="Project Name"
                    initialValue={selectedProjectDailyUpdate?.project?.clientName || ''}
                    rules={[{ required: true, message: 'Please enter project name' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="content"
                    label="Content"
                    initialValue={selectedProjectDailyUpdate?.content || ''}
                    rules={[{ required: true, message: 'Please enter project name' }]}
                >
                    <Input />
                </Form.Item>






                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Save
                    </Button>
                </Form.Item>
            </Form>
        </Drawer>
    );
};

export default EditProjectDailyUpdateDrawer;
