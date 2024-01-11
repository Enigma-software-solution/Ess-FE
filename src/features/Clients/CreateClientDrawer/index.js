import React, { useEffect, useState } from 'react';
import { Form, Row, Col, Input, Space, Drawer, Button, DatePicker } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { createClientApi, updateClientApi } from 'src/store/slices/clientSlice/apis';
import { getAllUsers } from 'src/store/slices/userSlice/selectors';
import { getAllUsersApi } from 'src/store/slices/userSlice/apis';
import { getSelectedClient } from 'src/store/slices/clientSlice/selectors';
import { ROLES } from 'src/constant/roles';
import { timeZoneDropdown } from 'src/constant/timeZones';
import { paymentCycleDropdown } from 'src/constant/paymentCycle';
import CustomDropdown from 'src/components/CustomDropdown';
import { ContractTypeDropdown } from 'src/constant/contracttype';
import CustomInput from 'src/components/formElements/CustomInput';
import CustomSelect from 'src/components/formElements/CustomSelect';
import { getAllProfiles } from 'src/store/slices/profielSlice/selectors';
import { getProfilesApi } from 'src/store/slices/profielSlice/apis';
import dayjs from 'dayjs'

const initialFormValues = {
    email: '',
    phoneNumber: '',
    clientName: '',
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
    profile: ''
};

const CreateClientDrawer = ({ isOpen, handleDrawer }) => {
    const dispatch = useDispatch();
    const allUsers = useSelector(getAllUsers);
    const selectedClient = useSelector(getSelectedClient);
    const allProfiles = useSelector(getAllProfiles);
    const [selectedDate, setSelectedDate] = useState(new Date())

    const [form] = Form.useForm();

    const usersWithProjectManagerRole = allUsers
        .filter(user => user.role === ROLES?.PROJECT_MANAGER)
        .map(user => ({
            id: user._id,
            name: `${user?.first_name} ${user?.last_name}`
        }));

    const usersWithDeveloperRole = allUsers
        .filter(user => user.role === ROLES?.USER)
        .map(user => ({
            id: user._id,
            name: `${user?.first_name} ${user?.last_name}`
        }));

    useEffect(() => {
        if (selectedClient) {
            form.setFieldsValue({
                email: selectedClient?.email,
                phoneNumber: selectedClient?.phoneNumber,
                clientName: selectedClient?.clientName,
                // apply: selectedClient?.apply?.positionToApply,
                projectManager: selectedClient?.projectManager?._id,
                name: selectedClient?.name,
                companyName: selectedClient?.companyName || '',
                contractType: selectedClient?.contractType || '',
                clientLocation: selectedClient?.clientLocation || '',
                clientTimeZone: selectedClient?.clientTimeZone || '',
                profileTimeZone: selectedClient?.profileTimeZone || '',
                teamLeadName: selectedClient?.teamLeadName || '',
                developer: selectedClient?.developer || '',
                paymentCycle: selectedClient?.paymentCycle || '',
                profile: selectedClient?.profile?._id,
            });
        } else {
            form.setFieldsValue({
                email: initialFormValues?.email,
                phoneNumber: initialFormValues?.phoneNumber,
                clientName: initialFormValues?.clientName,
                // apply: initialFormValues?.apply?.positionToApply,
                projectManager: initialFormValues?.projectManager?._id,
                name: initialFormValues?.name,
                companyName: initialFormValues?.companyName,
                contractType: initialFormValues?.contractType,
                clientLocation: initialFormValues?.clientLocation,
                clientTimeZone: initialFormValues?.clientTimeZone,
                profileTimeZone: initialFormValues?.profileTimeZone,
                teamLeadName: initialFormValues?.teamLeadName,
                developer: initialFormValues?.developer,
                paymentCycle: initialFormValues?.paymentCycle,
                profile: initialFormValues.profile,

            });
        }
    }, [selectedClient, form]);

    useEffect(() => {
        if (!allProfiles?.length) {
            dispatch(getProfilesApi());
        }
    }, []);

    useEffect(() => {
        if (!allUsers || allUsers?.length === 0) {
            dispatch(getAllUsersApi())
        }
    })

    const isEditMode = !!selectedClient;

    const onChange = (date, dateString) => {
        setSelectedDate(date)
    };
    const disabledDate = (current) => {
        return current && current > dayjs().endOf('day');
    };

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
        <Drawer open={isOpen} onClose={handleDrawer} width={800} title={isEditMode ? "Update Client" : "Create Client"}>
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
                        <CustomInput
                            label="Client Time Zone "
                            name='clientTimeZone'
                            rules={[{ required: true }]}
                            component={CustomSelect}
                            placeholder="Please select Client Time Zone "
                            options={timeZoneDropdown}
                            form={form}
                        />

                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="clientTeamLead"
                            label="Client Team Lead "
                            rules={[{ message: 'Please enter Client Team Lead ' }]}
                        >
                            <Input placeholder="Please enter Client Team Lead " />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <CustomInput
                            label="Contract Type"
                            name='contractType'
                            rules={[{ required: true }]}
                            component={CustomSelect}
                            placeholder="Please select Contract Type"
                            options={ContractTypeDropdown}
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
                        <CustomInput
                            label="Profile Time Zone"
                            name='profileTimeZone'
                            component={CustomSelect}
                            placeholder="Please select Profile Time Zone"
                            options={timeZoneDropdown}
                            form={form}
                        />
                    </Col>
                    <Col span={12}>


                        <CustomInput
                            label="Client Payment Cycle"
                            name='clientPaymentCycle'
                            component={CustomSelect}
                            placeholder="Please select Client Payment"
                            options={paymentCycleDropdown}
                            rules={[{ required: true }]}
                            form={form}
                        />
                    </Col>
                    <Col span={12}>



                        <CustomInput
                            label="Profile"
                            name="profile"
                            placeholder="Please select profile "
                            rules={[{ required: true, message: 'Please enter profile' }]}
                            component={CustomSelect}
                            options={allProfiles}
                            valueField='_id'
                            labelField='name'
                        />
                    </Col >
                    <Col span={12}>
                        <Form.Item
                            label="Created On"
                            name="createdOn"
                            rules={[{ required: true, message: 'Please select Created On Date' }]}
                        >
                            <DatePicker
                                onChange={onChange}
                                allowClear={false}
                                defaultValue={dayjs()}
                                disabledDate={disabledDate}
                                style={{ width: '100%' }}
                                showTime={false}
                                picker='date'

                            />
                        </Form.Item>
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

                </Row >
                <Form.Item>
                    <Space>
                        <Button onClick={handleDrawer}>Cancel</Button>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Space>
                </Form.Item>
            </Form >
        </Drawer >
    );
};

export default CreateClientDrawer;
