import React, { useEffect, useState } from 'react';
import { Flex, Input, Modal, Form, Button } from 'antd';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import { useDispatch, useSelector } from 'react-redux';
import { createPolicyApi, updatePolicyApi } from 'src/store/slices/policySlice/apis';
import { getSelectedPolicy } from 'src/store/slices/policySlice/selectors';
import { toast } from 'react-toastify';

const PolicyModal = ({ open, handleClose, selectedPolicy }) => {
    const [form] = Form.useForm();
    const [content, setContent] = useState('');

    const dispatch = useDispatch();

    const handleCancel = () => {
        form.resetFields();
        handleClose(false);
    };

    useEffect(() => {
        if (selectedPolicy) {
            form.setFieldsValue({
                title: selectedPolicy?.title || '',
                content: selectedPolicy.content || '',
            });
            setContent(selectedPolicy.content || '');
        } else {
            form.setFieldsValue({
                title: '',
                content: '',
            });
            setContent('');
        }
    }, [selectedPolicy, form]);

    const handleFinish = async (values) => {
        try {
            const data = { ...values, content };

            if (!content) {
                toast.error('Content cannot be empty');
                return;
            }

            if (selectedPolicy) {
                const res = await dispatch(updatePolicyApi({ id: selectedPolicy?._id, data })).unwrap();
                if (res.status === 200) {
                    form.resetFields();
                    handleClose(false);
                }
            } else {
                const res = await dispatch(createPolicyApi(data)).unwrap();
                if (res.status === 201) {
                    form.resetFields();
                    handleClose(false);
                }
            }

        } catch (error) {
            console.error("An error occurred:", error);
        }
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
        'color',
    ];

    const module = {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link'],
            ['clean'],
            [{ size: ['small', false, 'large', 'huge'] }], // Add font size option
            [{ color: [] }],

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
            <Form
                form={form}
                initialValues={{
                    content: selectedPolicy?.content,
                    title: selectedPolicy?.title,
                }}
                onFinish={handleFinish}
            >
                <Form.Item name="title" rules={[{ required: true, message: 'Please enter a title' }]}>
                    <Input size="large" defaultValue={selectedPolicy?.title} placeholder="Enter Title" />
                </Form.Item>

                <Form.Item
                    name="content"
                >
                    <ReactQuill
                        style={{ minHeight: '300px', height: '350px' }}
                        required
                        modules={module}
                        formats={format}
                        value={content}
                        onChange={setContent}
                    />
                </Form.Item>

                <Form.Item>
                    <Flex justify="end" gap={4} className='mt-5'>
                        <Button onClick={handleCancel}>Cancel</Button>
                        <Button type="primary" htmlType="submit">
                            {selectedPolicy ? "Update" : 'Save'}
                        </Button>
                    </Flex>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default PolicyModal;
