import React, { useEffect } from 'react';
import { Form, Row, Col, Input, Select, Space, Drawer, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { createClientApi, updateClientApi } from 'src/store/slices/clientSlice/apis';
import { toast } from 'react-toastify';
import { getAllUsers } from 'src/store/slices/userSlice/selectors';
import { getAllUsersApi } from 'src/store/slices/userSlice/apis';
import UserDropdown from 'src/components/CustomDropdown';
import { getSelectedClient } from 'src/store/slices/clientSlice/selectors';
import { ROLES } from 'src/constant/roles';
import { timeZone } from 'src/constant/timeZones';
import { paymentCycle } from 'src/constant/paymentCycle';
import CustomDropdown from 'src/components/CustomDropdown';
import { contractType } from 'src/constant/contracttype';


const initialFormValues = {
    email: '',
    phoneNumber: '',
    clientName: '',
    // apply: '',
    projectManager: '',
    name: '',
    companyName: '',
    contractType: '',
    clientLocation: '',
    clientTimeZone: '',
    profileTimeZone: '',
    teamLeadName: '',
    developer: '',
    paymentCycle: '',
};

const CreateClientDrawer = ({ isOpen, handleDrawer }) => {
    const dispatch = useDispatch();
    const allUsers = useSelector(getAllUsers);
    const selectedClient = useSelector(getSelectedClient);

    const [form] = Form.useForm();

    const usersWithProjectManagerRole = allUsers
        .filter(user => user.role === ROLES?.PROJECT_MANAGER)
        .map(user => `${user?.first_name} ${user?.last_name}`);

    const usersWithDeveloperRole = allUsers
        .filter(user => user.role === ROLES?.USER)
        .map(user => `${user?.first_name} ${user?.last_name}`);

    useEffect(() => {
        if (selectedClient) {
            form.setFieldsValue({
                email: selectedClient?.email,
                phoneNumber: selectedClient?.phoneNumber,
                clientName: selectedClient?.clientName,
                // apply: selectedClient?.apply?.positionToApply,
                projectManager: selectedClient?.projectManager?.first_name,
                name: selectedClient?.name,
                companyName: selectedClient?.companyName || '',
                contractType: selectedClient?.contractType || '',
                clientLocation: selectedClient?.clientLocation || '',
                clientTimeZone: selectedClient?.clientTimeZone || '',
                profileTimeZone: selectedClient?.profileTimeZone || '',
                teamLeadName: selectedClient?.teamLeadName || '',
                developer: selectedClient?.developer || '',
                paymentCycle: selectedClient?.paymentCycle || ''
            });
        } else {
            form.setFieldsValue({
                email: initialFormValues?.email,
                phoneNumber: initialFormValues?.phoneNumber,
                clientName: initialFormValues?.clientName,
                // apply: initialFormValues?.apply?.positionToApply,
                projectManager: initialFormValues?.projectManager?.first_name,
                name: initialFormValues?.name,
                companyName: initialFormValues?.companyName,
                contractType: initialFormValues?.contractType,
                clientLocation: initialFormValues?.clientLocation,
                clientTimeZone: initialFormValues?.clientTimeZone,
                profileTimeZone: initialFormValues?.profileTimeZone,
                teamLeadName: initialFormValues?.teamLeadName,
                developer: initialFormValues?.developer,
                paymentCycle: initialFormValues?.paymentCycle,

            });
        }
    }, [selectedClient, form]);

    useEffect(() => {
        if (!allUsers || allUsers?.length === 0) {
            dispatch(getAllUsersApi())
        }
    })

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();

            const data = { ...values };
            if (selectedClient) {
                dispatch(updateClientApi({ data, id: selectedClient?._id }));
            } else {
                dispatch(createClientApi(data));
            }

            form.setFieldsValue(initialFormValues);
            handleDrawer();
        } catch (error) {
            console.error('Please fill in all required fields.');
        }
    };

    return (
        <Drawer open={isOpen} onClose={handleDrawer} width={800} title={"Create Client"}>
            {/* <Form form={form} layout="vertical" onFinish={handleSubmit}></Form>
            <div className="d-flex w-100 gap-1 mb-4">
                <Button type="primary">Add Notes</Button>
            </div> */}
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
                <Row gutter={16}>

                    <Col span={12}>
                        <Form.Item
                            name="clientName"
                            label="Client Name"
                            rules={[{ required: true, message: 'Please enter Client Name' }]}
                        >
                            <Input placeholder="Please enter Client Name" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="email"
                            label="Client Email"
                            rules={[{ required: true, message: 'Please enter Client Email' }]}
                        >
                            <Input placeholder="Please enter Client Email" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <CustomDropdown
                            name='projectManager'
                            label="Project Manager"
                            required={true}
                            placeholder="Select a Project Manager"
                            options={usersWithProjectManagerRole}
                            form={form}
                        />
                    </Col>

                    <Col span={12}>
                        <CustomDropdown
                            name='developer'
                            label="Developer"
                            required={true}
                            placeholder="Select a developer"
                            options={usersWithDeveloperRole}
                            form={form}
                        />
                    </Col>

                    <Col span={12}>
                        <CustomDropdown
                            name='clientTimeZone'
                            label="Client Time Zone"
                            placeholder="Please select Client Time zone"
                            options={timeZone}
                            form={form}

                        />

                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="clientTeamLeadName"
                            label="Client Team Lead Name"
                            rules={[{ message: 'Please enter Client Team Lead Name' }]}
                        >
                            <Input placeholder="Please enter Client Team Lead Name" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <CustomDropdown
                            name='contract type'
                            label="Contract Type"
                            placeholder="Please select Contract Type"
                            options={contractType}
                            form={form}

                        />
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="clientLocation"
                            label="Client Location"
                            rules={[{ message: 'Please enter Client Location' }]}
                        >
                            <Input placeholder="Please enter Client Location" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <CustomDropdown
                            name='profile time zone'
                            label="Profile Time Zone"
                            placeholder="Please select profile Time zone"
                            options={timeZone}
                            form={form}

                        />
                    </Col>
                    <Col span={12}>

                        <CustomDropdown
                            name='clientPaymentCycle'
                            label="Client Payment Cycle"
                            placeholder="Please select Client Payment "
                            options={paymentCycle}
                            required={true}
                            form={form}
                        />
                    </Col>

                    {/* <Col span={12}>
                        <Form.Item name="apply" label="Apply" >
                            <Select
                                style={{ width: "100%" }}
                                showSearch
                                onSearch={fetchApplyData}
                                placeholder="Select an applies"
                                optionFilterProp="children"
                                value={applyId}
                                onChange={(value) => setApplyId(value)}
                            >
                                {applies?.map((apply) => (
                                    <Option key={apply?._id} value={apply?._id}>
                                        {apply?.clientName}{" "}
                                        {apply?.clientJobPosition && ` -  ${apply?.clientJobPosition} `}
                                        <span
                                            style={{
                                                fontSize: "80%",
                                                opacity: 0.7,
                                                display: "flex",
                                                justifyContent: "flex-end",
                                            }}
                                        >
                                            {format(new Date(apply?.createdAt), "dd-MM-yyyy")}
                                        </span>
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>

                    </Col> */}

                </Row>
                <Form.Item>
                    <Space>
                        <Button onClick={handleDrawer}>Cancel</Button>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </Drawer >
    );
};

export default CreateClientDrawer;
