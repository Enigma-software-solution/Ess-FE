import React, { useEffect, useState } from 'react';
import { Form, Row, Col, Input, Select, Space, Drawer, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { getProfilesApi } from 'src/store/slices/profielSlice/apis';
import { getAllProfiles } from 'src/store/slices/profielSlice/selectors';
import { createClientApi } from 'src/store/slices/clientSlice/apis';
import qs from "qs";
import { format } from "date-fns";
import { getApplyBySearchApi } from 'src/store/slices/agendaSlice/apis';
import { toast } from 'react-toastify';
import { getAllUsers } from 'src/store/slices/userSlice/selectors';
import { getAllUsersApi } from 'src/store/slices/userSlice/apis';
import UserDropdown from 'src/components/UserDropdown';


const { Option } = Select;

const initialFormValues = {
    email: '',
    phoneNumber: '',
    clientName: '',
    apply: "",
    username: ''
};

const CreateClientDrawer = ({ isOpen, handleDrawer }) => {

    const [applies, setApplies] = useState([]);
    const [applyId, setApplyId] = useState("");


    const dispatch = useDispatch();
    const allProfiles = useSelector(getAllProfiles);
    const allUsers = useSelector(getAllUsers)

    const [form] = Form.useForm();

    console.log(allUsers, "usersssssss")

    useEffect(() => {
        if (!allProfiles.length) {
            dispatch(getProfilesApi());
        }
    }, []);

    useEffect(() => {
        if (!allUsers) {
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

            dispatch(createClientApi(data));

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
                            label="Company Phone Number"
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
                                    <Option key={apply._id} value={apply._id}>
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
                                            {format(new Date(apply.createdAt), "dd-MM-yyyy")}
                                        </span>
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>

                    </Col>

                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="projectManager"
                            label="Project Manager"
                            rules={[{ required: true, message: 'Please select a Project Manager' }]}
                        >
                            <UserDropdown
                                label="Project Manager"
                                placeholder="Select a Project Manager"
                                allUsers={allUsers} // assuming you have allUsers defined somewhere
                                form={form} // assuming you have form defined somewhere
                            />
                        </Form.Item>
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
