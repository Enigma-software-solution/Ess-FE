import React, { useEffect, useState } from "react";
import { Drawer, Form, Button, TimePicker } from "antd";
import { useDispatch, useSelector } from "react-redux";
import CustomInput from "src/components/formElements/CustomInput";
import CustomSelect from "src/components/formElements/CustomSelect";
import { closeClientEventDrawer } from "src/store/slices/agendaSlice";
import { isClientEventDrawer } from "src/store/slices/agendaSlice/selector";
import { getAllUsersApi } from "src/store/slices/userSlice/apis";
import { formatDate, formatTime } from "src/utils/formatsOfDate";
import { getLogedInUser } from "src/store/slices/authSlice/selectors";
import { getAllUsers } from "src/store/slices/userSlice/selectors";
import { createEventsApi } from "src/store/slices/agendaSlice/apis";
import { getAllClientsSelector } from "src/store/slices/clientSlice/selectors";
import { getAllClientsApi } from "src/store/slices/clientSlice/apis";
import { ClientCallTypeDropdown } from "src/constant/callTypes";
import dayjs from "dayjs";

const ClientEventDrawer = ({ selectedDate, setSelectedDate }) => {
    const dispatch = useDispatch();
    const isDrawer = useSelector(isClientEventDrawer);
    const loggedInUser = useSelector(getLogedInUser);
    const users = useSelector(getAllUsers);
    const clients = useSelector(getAllClientsSelector);
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const [callDuration, setCallDuration] = useState(null);

    const handleClose = () => {
        dispatch(closeClientEventDrawer());
    };

    const handleTimeChange = (dates, dateString) => {
        const updatedStartDate = dayjs(dates[0]).format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
        const updatedEndDate = dayjs(dates[1]).format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
        setSelectedDate({
            start: updatedStartDate,
            end: updatedEndDate,
        });
    };
    const calculateAndSetCallDuration = () => {
        const startTime = dayjs(selectedDate.start);
        const endTime = dayjs(selectedDate.end);
        const duration = endTime.diff(startTime, 'minutes');
        const hours = Math.floor(duration / 60);
        const minutes = duration % 60;

        setCallDuration(`${hours} hours ${minutes} minutes`);
        form.setFieldsValue({
            callDuration: `${duration} minutes`,
        });
    };
    const handleSubmit = async (values) => {
        setLoading(true);
        try {
            const createData = {
                createdBy: loggedInUser.id,
                ...selectedDate,
                ...values,
                eventType: "clientCall",
            };
            await dispatch(createEventsApi(createData));
            await form.resetFields();
        } catch (error) {
            console.error("Error submitting form:", error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        if (!users?.length) {
            dispatch(getAllUsersApi());
        }

    }, []);

    useEffect(() => {
        if (!clients?.length) {
            dispatch(getAllClientsApi());
        }
    }, []);

    useEffect(() => {
        if (selectedDate.start && selectedDate.end) {
            calculateAndSetCallDuration();
        }
    }, [selectedDate]);

    return (
        <Drawer
            title="Client Call"
            placement="right"
            closable={true}
            onClose={handleClose}
            open={isDrawer}
            width={500}
            extra={
                <div className="align-righ">
                    <Button
                        type="primary"
                        htmlType="submit"
                        onClick={() => form.submit()}
                        loading={loading}
                    >
                        Save
                    </Button>
                </div>
            }
        >
            <Form
                name="event-form"
                onFinish={handleSubmit}
                form={form}
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
            >    <div className="d-flex justify-content-end align-items-end flex-column mb-3">
                    <p>Date: {formatDate(selectedDate?.start)}</p>
                    <div className="mt-2 ">
                        <span>Time :  </span>
                        <TimePicker.RangePicker
                            format="hh:mm A"
                            value={
                                selectedDate.start && selectedDate.end
                                    ? [
                                        dayjs(selectedDate.start),
                                        dayjs(selectedDate.end),
                                    ]
                                    : undefined
                            }
                            onChange={handleTimeChange}
                        />
                    </div>
                </div>
                <CustomInput
                    label="Call duration"
                    name="callDuration"
                    rules={[{ required: true }]}
                    type="text"
                />
                <CustomInput
                    label="Client"
                    name="client"
                    rules={[{ required: true }]}
                    component={CustomSelect}
                    placeholder="Select client "
                    options={clients}
                    labelField="clientName"
                    valueField="clientName"
                />
                <CustomInput
                    label="Assign To"
                    name="assignTo"
                    rules={[{ required: true }]}
                    component={CustomSelect}
                    placeholder="Select user "
                    options={users}
                    labelField="first_name"
                    valueField="_id"
                />
                <CustomInput
                    label="Call Type"
                    name="callType"
                    rules={[{ required: true }]}
                    component={CustomSelect}
                    placeholder="Select call type "
                    options={ClientCallTypeDropdown}
                />
            </Form>
        </Drawer>
    );
};

export default ClientEventDrawer;
