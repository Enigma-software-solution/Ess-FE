import React, { useEffect, useState } from "react";
import { Button, DatePicker, Flex, Form, Modal, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getAllClientsSelector } from "src/store/slices/clientSlice/selectors";
import { getAllClientsApi } from "src/store/slices/clientSlice/apis";
import { getUserId } from "src/store/slices/authSlice/selectors";
import { createDailyProjectUpdateApi } from "src/store/slices/projectDailyUpdates/apis";
import { toast } from "react-toastify";
import RichTextEditor from "src/components/RichTextEditor";
import dayjs from "dayjs";
import { getAllProjectDailyUpdates, getSelectedProjectDailyUpdates, getmodalVisible } from "src/store/slices/projectDailyUpdates/selectors";
import { setModalVisible } from "src/store/slices/projectDailyUpdates";
import ReactQuill from "react-quill";

const { Option } = Select;

const AddProjectDailyUpdateModal = ({ open, handleClose, selectedProject }) => {
 

    const allClients = useSelector(getAllClientsSelector)
    const todayAllUpdates = useSelector(getAllProjectDailyUpdates)
    const filteredUpdatesId = todayAllUpdates?.dailyUpdates?.map((update) => update?.project?._id);
    const [form] = Form.useForm();
    const [content, setContent] = useState('');
    const dispatch = useDispatch();

    const userId = useSelector(getUserId);

    const onFinish = async (values) => {
        try {
            if (!values.content || values.content === "<p><br></p>") {
                throw new Error("Please input all fields");
            }
            const formData = {
                ...values,
                user: userId,
            };
            dispatch(createDailyProjectUpdateApi(formData));
            form.resetFields();
            handleClose(true);
        } catch (error) {
            toast.error(error.message);
        }
    };


    const handleCancel = () => {
        form.resetFields();
        handleClose(false)
    };

    const stripHtmlTags = (htmlString) => {
        if (!htmlString) {
            return "";
        }
        const doc = new DOMParser().parseFromString(htmlString, 'text/html');
        return doc.body.textContent || "";
    };
    useEffect(() => {
        form.setFieldsValue({
            date: dayjs(),
            project: selectedProject?.project?.clientName || undefined,
            content: stripHtmlTags(selectedProject?.content),
        });
    }, [selectedProject]);

    useEffect(() => {
        dispatch(getAllClientsApi())
    }, [])

    return (
        <div>
          
            <Modal
                title="Daily Project Update"
                open={open}
                onCancel={handleCancel}
                footer={null}
                width={"50%"}
            >
                <Form
                    form={form}
                    initialValues={{
                        content: selectedProject?.content,
                        project: selectedProject?.project?.clientName,
                    }}
                    onFinish={onFinish}
                >
                    <Flex justify="space-between">
                        <Form.Item name="date">
                            <DatePicker disabled />
                        </Form.Item>
                        <Form.Item
                            name="project"
                            rules={[{ required: true, message: "Please select a project" }]}
                        >
                            <Select style={{ width: "180px" }} placeholder="Select a project">
                                {allClients?.filter((client) => client?.active === "active" && !filteredUpdatesId?.includes(client?._id))
                                    .map((project) => (
                                        <Option key={project?._id} value={project?._id}>
                                            {project?.clientName}
                                        </Option>
                                    ))}
                            </Select>
                        </Form.Item>
                    </Flex>

                    <Form.Item
                        name="content"
                        rules={[{ required: true, message: "Please input content" }]}
                    >
                          <ReactQuill
                            style={{ height: '200px' }}
                            theme="snow"
                            value={content}
                            onChange={setContent}
                            />
                    </Form.Item>

                    <Form.Item>
                    <Flex justify="end" gap={4} className='mt-5'>
                        <Button onClick={handleCancel}>Cancel</Button>
                        <Button type="primary" htmlType="submit">
                            {selectedProject ? "Update" : 'Save'}
                        </Button>
                    </Flex>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default AddProjectDailyUpdateModal;
