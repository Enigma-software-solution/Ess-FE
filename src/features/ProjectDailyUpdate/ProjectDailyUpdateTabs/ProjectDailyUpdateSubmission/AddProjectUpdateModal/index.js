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
import { getAllProjectDailyUpdates } from "src/store/slices/projectDailyUpdates/selectors";

const { Option } = Select;

const AddProjectDailyUpdateModal = () => {
    const [modalVisible, setModalVisible] = useState(false);

    const allClients = useSelector(getAllClientsSelector)
    const todayAllUpdates = useSelector(getAllProjectDailyUpdates)
    const filteredUpdatesId = todayAllUpdates?.dailyUpdates?.map((update) => update?.project?._id);

    const [form] = Form.useForm();
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
            handleCancel();
        } catch (error) {
            toast.error(error.message);
        }
    };

    const showModal = () => {
        setModalVisible(true);
    };

    const handleCancel = () => {
        setModalVisible(false);
    };

    useEffect(() => {
        dispatch(getAllClientsApi())
    }, [])

    return (
        <div>
            <Button onClick={showModal} type="primary">
                ADD PROJECT UPDATE
            </Button>
            <Modal
                title="Daily Project Update"
                open={modalVisible}
                onCancel={handleCancel}
                footer={null}
                width={"50%"}
            >
                <Form
                    form={form}
                    initialValues={{
                        user: userId,
                        date: dayjs(),
                        content: "",
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
                        <RichTextEditor />
                    </Form.Item>

                    <Form.Item>
                        <Button htmlType="submit" className="mt-4" type="primary">
                            SAVE
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default AddProjectDailyUpdateModal;
