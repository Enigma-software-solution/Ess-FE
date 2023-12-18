import React, { useEffect, useState } from 'react';
import { Button, DatePicker, Flex, Form, Select } from 'antd';
import moment from 'moment';
import ReactQuill from 'react-quill';
import { useDispatch, useSelector } from 'react-redux';
import { getAllClientsSelector } from 'src/store/slices/clientSlice/selectors';
import { getAllClientsApi } from 'src/store/slices/clientSlice/apis';
import { getUserId } from 'src/store/slices/authSlice/selectors';
import { createDailyProjectUpdateApi } from 'src/store/slices/projectDailyUpdates/apis';
import { toast } from 'react-toastify';

const { Option } = Select;

const DailyProjectNewUpdate = () => {
    const [form] = Form.useForm(); // Access the form methods

    const dispatch = useDispatch();
    const projects = useSelector(getAllClientsSelector);
    const userId = useSelector(getUserId);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(getAllClientsApi());
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [dispatch]);

    const handleChangeProject = (value) => {
        form.setFieldsValue({ project: value });
    };

    const onFinish = (values) => {
        if (values.content === null || values.content === '<p><br></p>') {
            return toast.warn('Please input all feilds')
        }

        const formData = {
            ...values,
            user: userId,
        };
        dispatch(createDailyProjectUpdateApi(formData));
        form.resetFields();
    };

    const format = ['header', 'font', 'size', 'bold', 'italic', 'underline', 'strike', 'blockquote', 'list', 'bullet', 'indent', 'link', 'color'];
    const module = {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link'],
            ['clean'],
            [{ size: ['small', false, 'large', 'huge'] }],
            [{ color: [] }],
        ],
    };

    return (
        <div style={{ padding: '30px' }}>
            <Form
                form={form}
                initialValues={{
                    user: userId,
                    date: moment(),
                    content: '',
                }}
                onFinish={onFinish}
            >
                <div className="d-flex justify-content-between">
                    <Form.Item name="date">
                        <DatePicker disabled />
                    </Form.Item>
                    <Form.Item
                        name="project"
                        rules={[{ required: true, message: 'Please select a project' }]}
                    >
                        <Select
                            style={{ width: '180px' }}
                            placeholder="Select a project"
                            onChange={handleChangeProject}
                        >
                            {projects?.map((p, index) => (
                                <Option key={index} value={p?._id}>
                                    {p?.clientName}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                </div>

                <Form.Item
                    name="content"
                    rules={[{ required: true, message: 'Please input content' }]}
                >
                    <ReactQuill
                        className="my-4"
                        style={{ minHeight: '150px', height: '200px' }}
                        modules={module}
                        formats={format}
                    />
                </Form.Item>

                <Flex justify='flex-end'>
                    <Button htmlType="submit" className="mt-4" type="primary">
                        SAVE
                    </Button>
                </Flex>
            </Form>
        </div>
    );
};

export default DailyProjectNewUpdate;