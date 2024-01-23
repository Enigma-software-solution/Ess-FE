import React, { useEffect, useState } from "react";
import { Button, DatePicker, Flex, Form, Modal, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getAllClientsSelector } from "src/store/slices/clientSlice/selectors";
import { getAllClientsApi } from "src/store/slices/clientSlice/apis";
import { getLogedInUser, getUserId } from "src/store/slices/authSlice/selectors";
import { createDailyProjectUpdateApi, updateDailyUpdate } from "src/store/slices/projectDailyUpdates/apis";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { getAllProjectDailyUpdates, } from "src/store/slices/projectDailyUpdates/selectors";
import ReactQuill from "react-quill";

const { Option } = Select;

const AddProjectDailyUpdateModal = ({ open, handleClose, selectedProject }) => {


    const allClients = useSelector(getAllClientsSelector)

    const todayAllUpdates = useSelector(getAllProjectDailyUpdates);
    const filteredUpdatesId = todayAllUpdates?.dailyUpdates?.map((update) => update?.project?._id);
    const loggedInUser = useSelector(getLogedInUser);
    const [filteredClients, setfilteredClients] = useState();

    const [form] = Form.useForm();
    const [content, setContent] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllClientsApi())
    }, [])

    const userId = useSelector(getUserId);
    const onFinish = async (values) => {
        try {
            const formData = {
                ...values,
                content,
            };

            if (!content) {
                toast.error('Content cannot be empty');
                return;
            }

            if (selectedProject) {

                const res = await dispatch(updateDailyUpdate({ id: userId, formData })).unwrap();
                if (res.status === 200) {
                    form.resetFields();
                    handleClose(false);
                }
            } else {
                formData.user = userId;
                const res = await dispatch(createDailyProjectUpdateApi(formData)).unwrap();
                if (res.status === 201) {
                    form.resetFields();
                    handleClose(false);
                }
            }


        } catch (error) {
            console.error("An error occurred:", error);
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

        switch (loggedInUser?.role) {
            case "admin":
                setfilteredClients(allClients);
                break;

            case "project_manager":
                setfilteredClients(allClients?.filter(record => record?.projectManager?._id === loggedInUser?.id));
                break;

            default:
                setfilteredClients(allClients?.filter(record => record?.developer?._id === loggedInUser?.id));
                break;
        }

    }, [loggedInUser]);



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
                                {filteredClients?.filter((client) => client?.active === "active" && !filteredUpdatesId?.includes(client?._id))
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
                        <Flex justify="end" gap={4} className='mt-3'>
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
