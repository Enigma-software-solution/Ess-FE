import React, { useEffect, useState } from 'react';
import { Form, Row, Col, Input, Select, Space, Drawer, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { getProfilesApi } from 'src/store/slices/profielSlice/apis';
import { getAllProfiles} from 'src/store/slices/profielSlice/selectors';
import { createClientApi, updateClientApi } from 'src/store/slices/clientSlice/apis';
import qs from "qs";
import { format } from "date-fns";
import { getApplyBySearchApi } from 'src/store/slices/agendaSlice/apis';
import { toast } from 'react-toastify';
import { getAllUsers } from 'src/store/slices/userSlice/selectors';
import { getAllUsersApi } from 'src/store/slices/userSlice/apis';
import UserDropdown from 'src/components/UserDropdown';
import { getSelectedClient, selectedClient } from 'src/store/slices/clientSlice/selectors';


const { Option } = Select;

const initialFormValues = {
    email: '',
    phoneNumber: '',
    clientName: '',
    apply: "",
    projectManager: '',
    name: "",
};

const CreateClientDrawer = ({ isOpen, handleDrawer }) => {

    const [applies, setApplies] = useState([]);
    const [applyId, setApplyId] = useState("");


    const dispatch = useDispatch();
    const allUsers = useSelector(getAllUsers)

    const selectedClient = useSelector(getSelectedClient)
    const [form] = Form.useForm();




    useEffect(() => {
        if (selectedClient) {
            form.setFieldsValue({
                email: selectedClient?.email,
                phoneNumber: selectedClient?.phoneNumber,
                clientName: selectedClient?.clientName,
                apply: selectedClient?.apply.positionToApply,
                projectManager: selectedClient?.projectManager?.first_name,
                name: selectedClient?.name,
            });
        } else {
            form.setFieldsValue({
                email: initialFormValues?.email,
                phoneNumber: initialFormValues?.phoneNumber,
                clientName: initialFormValues?.clientName,
                apply: initialFormValues?.apply.positionToApply,
                projectManager: initialFormValues?.projectManager?.first_name,
                name: initialFormValues?.name,
            });
        }   
                
    }, [selectedClient, form]);


    useEffect(() => {
        if (!allUsers || allUsers?.length === 0) {
            dispatch(getAllUsersApi())
        }
    })

    const fetchApplyData = async (searchText) => {
        const d = {
            search: searchText,
        };
        const params = qs.stringify(d);

        try {
            const res = await dispatch(getApplyBySearchApi(params)).unwrap();
            setApplies(res.data?.daily_applies || []);
        } catch (error) {
            console.error("Error fetching applies:", error);
        }
    };


    const handleSubmit = async (values) => {
        try {
            const data = {
                ...values
            };
            if (selectedClient) {
                dispatch(updateClientApi({ data, id: selectedClient?._id }))
            } else {
                dispatch(createClientApi(data));
            }
            form.setFieldsValue(initialFormValues);
            handleDrawer();
        } catch (error) {
            toast.error(error.message)
        }
    };

    return (
        <Drawer open={isOpen} onClose={handleDrawer} width={800}
            title={"Create Client"}
        >

            <Form form={form} layout="vertical" hideRequiredMark onFinish={handleSubmit} >
                <Row gutter={16}>
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
                        <Form.Item
                            name="phoneNumber"
                            label="Client Phone Number"
                            rules={[{ required: true, message: 'Please enter Client Phone Number' }]}
                        >
                            <Input placeholder="Please enter Client Phone Number" />
                        </Form.Item>
                    </Col>

                </Row>

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

                    </Col>

                </Row>
                <Row gutter={16}>
                    <Col span={12}>

                        <UserDropdown
                            name='projectManager'
                            label="Project manger"
                            placeholder="Select a Project Manager"
                            allUsers={allUsers}
                            form={form}
                        />
                    </Col>
                </Row>


                <Form.Item>
                    <Space>
                        <Button onClick={handleDrawer} >Cancel</Button>
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
