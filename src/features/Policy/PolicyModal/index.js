import React, { useState } from 'react';
import { Flex, Input, Modal, Form, Button } from 'antd';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import { useDispatch } from 'react-redux';
import { createPolicyApi } from 'src/store/slices/policySlice/apis';

const PolicyModal = ({ open, handleClose }) => {
    const [form] = Form.useForm(); // Create form instance

    const dispatch = useDispatch()
    const handleCancel = () => {
        form.resetFields(); // Reset fields on cancel
        handleClose(false);
    };

    const handleFinish = (values) => {
        console.log('Form values:', values);
        dispatch(createPolicyApi(values))
        handleClose(false); // Close modal after submission
    };
 
    const format = [
        'header',
        'font',
        'size',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'list',
        'bullet',
        'indent',
        'link',
        'image',
        'color',
    ];

    const module = {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link', 'image'],
            ['clean'], ['color']
        ],
    };
    
    return (
        <Modal
            width={'60vw'}
            title="Create New Policy"
            open={open}
            footer={null}
            onCancel={handleCancel}
        >
            <Form form={form} onFinish={handleFinish}>
                <Form.Item name="title" rules={[{ required: true, message: 'Please enter a title' }]}>
                    <Input size="large" placeholder="Enter Title" />
                </Form.Item>

                <Form.Item name="content">
                    <ReactQuill
                        style={{ minHeight: '300px', height: '350px' }}
                        modules={module}
                        formats={format}
                    />
                </Form.Item>

                <Form.Item>
                    <Flex justify="end" gap={4} className='mt-5'>
                        <Button onClick={handleCancel}>Cancel</Button>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Flex>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default PolicyModal;
