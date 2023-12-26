import React, { useEffect, useState } from 'react';
import { Popconfirm, Table, Modal, Form, Select, DatePicker, Button, Flex } from 'antd';
import format from 'date-fns/format';
import { useDispatch, useSelector } from 'react-redux';
import DeleteButton from 'src/components/buttons/DeleteButton';
import EditButton from 'src/components/buttons/EditButton';
import { deteleDailyProjectUpdatesApi, getDailyProjectUpdateApi } from 'src/store/slices/projectDailyUpdates/apis';
import { getAllProjectDailyUpdates } from 'src/store/slices/projectDailyUpdates/selectors';
import qs from 'qs'
import { getLogedInUser, getUserId } from 'src/store/slices/authSlice/selectors';
import RichTextEditor from 'src/components/RichTextEditor';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import { createDailyAppliesApi } from 'src/store/slices/dailyApplySlice/apis';
import { getAllClientsSelector } from 'src/store/slices/clientSlice/selectors';

const ViewDailyProjectUpdateTable = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const allClients = useSelector(getAllClientsSelector)
    const todayAllUpdates = useSelector(getAllProjectDailyUpdates)
    const filteredUpdatesId = todayAllUpdates?.dailyUpdates?.map((update) => update?.project?._id);
    const { Option } = Select;
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
            dispatch(createDailyAppliesApi(formData));
            form.resetFields();
        } catch (error) {
            toast.error(error.message);
        }
    };
    const handleModalOpen = () => {
        setIsModalVisible(true);
    };
    const handleModalClose = () => {
        setIsModalVisible(false);
    };
    const authUser = useSelector(getLogedInUser)
    const handleConfirmDelete = (recordToDelete, e) => {
        dispatch(deteleDailyProjectUpdatesApi(recordToDelete?._id))
    };
    const handleClick = (record, e, handleModalOpen) => {
        handleModalOpen();
    }
    const columns = [
        {
            title: 'Project Name',
            dataIndex: 'project',
            key: 'Project',
            render: (text, record) => record.project?.clientName || 'No client name',
        },
        {
            title: 'Project Manager',
            dataIndex: 'ProjectManager',
            key: 'ProjectManager',
            render: (text, record) => {
                const projectManager = record.project?.projectManager;
                if (projectManager && projectManager?.first_name && projectManager?.last_name) {
                    return `${projectManager?.first_name} ${projectManager?.last_name}`;
                } else {
                    return 'No project manager';
                }
            },
        },
        {
            title: 'Update',
            dataIndex: 'content',
            key: 'Update',
            render: (text, record) => (
                <span dangerouslySetInnerHTML={{ __html: record?.content }} />
            ),
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'Date',
            render: (text, record) => {
                const formattedDate = format(new Date(record?.date), 'MM/dd/yyyy');
                return formattedDate;
            },
        },
        {
            key: 'action',
            title: 'Action',
            dataIndex: 'action',
            render: (text, record) => (
                <div className='d-flex gap-1'>
                    <EditButton onClick={(e) => handleClick(record, e, handleModalOpen)} />
                    <Popconfirm
                        title="Are you sure to delete this update?"
                        onConfirm={(e) => handleConfirmDelete(record, e)}
                        onCancel={(e) => e.stopPropagation()}
                        okText="Yes"
                        cancelText="No"
                    >
                        <DeleteButton onClick={(e) => e.stopPropagation()}>Delete</DeleteButton>
                    </Popconfirm>
                </div>
            ),
        },
    ];
    useEffect(() => {
        const params = qs.stringify({
            date: new Date(),
            user: authUser?.id
        })
        dispatch(getDailyProjectUpdateApi(params))
    }, [])
    return (
        <>
            <Modal
                title="Edit Update"
                visible={isModalVisible}
                onCancel={handleModalClose}
                footer={null}
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
            <Table className='mt-4 px-5' dataSource={todayAllUpdates?.dailyUpdates} columns={columns} />
        </>
    );
};
export default ViewDailyProjectUpdateTable;