import React, { useEffect, useState } from "react";
import { Button, Form, Input, Select } from "antd";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { Drawer } from "antd";
import {
  UpdateEventsApi,
  createEventsApi,
  getApplyBySearchApi,
} from "src/store/slices/agenda/apis";
import { CallType } from "src/constant/callTypes";
import { CallPlatform } from "src/constant/callplatform";
import { getUserId } from "src/store/slices/authSlice/selectors";
import qs from "qs";
import {
  checkSlotDrawer,
  getSelectEvent,
} from "src/store/slices/agenda/selector";
import {
  closeEventDrawer,
  closeSlotDrawer,
  setSelectedEvent,
} from "src/store/slices/agenda";
import { getAllUsersApi } from "src/store/slices/userSlice/apis";
import { getAllUsers } from "src/store/slices/userSlice/selectors";
import UserList from "../UserList";
const { Option } = Select;

const CreateEventDrawer = ({ selectedDate }) => {
  const [form] = Form.useForm();

  const dispatch = useDispatch();

  const isDrawer = useSelector(checkSlotDrawer);
  const selectedEvent = useSelector(getSelectEvent);
  const userId = useSelector(getUserId);
  const users = useSelector(getAllUsers);

  const onClose = () => {
    form.resetFields();
    dispatch(closeSlotDrawer());
  };

  const handleCreateOrUpdateEvent = (values) => {
    const CreateData = {
      createdBy: userId,
      ...selectedDate,
      ...values,
    };

    const updateData = {
      createdBy: userId,
      start: selectedEvent?.start,
      end: selectedEvent?.end,
      ...values,
    };

    if (selectedEvent?._id) {
      dispatch(
        UpdateEventsApi({
          eventId: selectedEvent?._id,
          event: updateData,
        })
      );
    } else {
      dispatch(createEventsApi(CreateData));
    }

    dispatch(setSelectedEvent(null));
    onClose();
    dispatch(closeEventDrawer());
    dispatch(closeSlotDrawer());
  };

  useEffect(() => {
    if (selectedEvent?._id) {
      form.setFieldsValue({
        companyName: selectedEvent?.companyName,
        jobTitle: selectedEvent?.jobTitle,
        callDuration: selectedEvent?.callDuration,
        numOfGuests: selectedEvent?.numOfGuests,
        callMode: selectedEvent?.callMode,
        callType: selectedEvent?.callType,
        callPlatform: selectedEvent?.callPlatform,
        mailLink: selectedEvent?.mailLink,
        callLink: selectedEvent?.callLink,
        apply: selectedEvent?.apply?._id,
        assignTo: selectedEvent?.users?.data?._id,
        companyInformation: selectedEvent?.companyInformation,
      });
    } else {
      form.resetFields();
    }
  }, [selectedEvent, form]);

  useEffect(() => {
    dispatch(getAllUsersApi())
  }, [])


  const [applies, setApplies] = useState([]);

  async function fetchApplyData(searchText) {
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
  }

  return (
    <Drawer
      title="Add Event"
      placement="right"
      closable={true}
      onClose={onClose}
      open={isDrawer}
      width={860}
    >
      <Form name="event-form" onFinish={handleCreateOrUpdateEvent} form={form}>
        <div className="d-flex justify-content-end align-items-end flex-column mb-1">
          <p>Date: {format(new Date(selectedDate.start), "dd-MM-yyyy")}</p>
          <p>
            Time: {format(new Date(selectedDate.start), "p")} -{" "}
            {format(new Date(selectedDate.end), "p")}
          </p>
        </div>

        <div className="d-flex justify-content-between mb-1">
          <div style={{ flex: 1, marginRight: "20px" }}>



            <Form.Item
              name="callDuration"
              label="Call duration"
              rules={[{ required: true }]}
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item name="numOfGuests" label="Number of Guests">
              <Input type="number" />
            </Form.Item>
            <Form.Item name="mailLink" label="Mail Link">
              <Input type="text" />
            </Form.Item>

            <Form.Item name="callLink" label="Call Link">
              <Input type="text" />
            </Form.Item>

            <Form.Item name="assignTo" label="Assign To">
              <UserList />
              {/* <Select
                style={{ width: "100%" }}
                placeholder="Select User"
                optionFilterProp="children"
              >
                {users?.map((user) => (
                  <Option key={user._id} value={user._id}>
                    {`${user?.first_name} - ${user?.email} `}
                  </Option>
                ))}
              </Select> */}
            </Form.Item>
          </div>
          <div style={{ flex: 1 }}>
            <Form.Item
              name="callType"
              label="Call Type"
              rules={[{ required: true }]}
            >
              <Select>
                <Option value={CallType.Initial}>Initial</Option>
                <Option value={CallType.Technical}>Technical </Option>
                <Option value={CallType.Final}>Final</Option>
                <Option value={CallType.Reschedule}>Reschedule</Option>
              </Select>
            </Form.Item>
            <Form.Item name="callMode" label="Call Mode">
              <Select>
                <Option value="voice">Voice</Option>
                <Option value="video">Video</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="callPlatform"
              label="Call Platform"
              rules={[{ required: true }]}
            >
              <Select>
                <Option value={CallPlatform.Zoom}>Zoom</Option>
                <Option value={CallPlatform.GoogleMeet}>Google Meet</Option>
                <Option value={CallPlatform.MicrosoftTeams}>
                  Microsoft Teams
                </Option>
              </Select>
            </Form.Item>

            <Form.Item name="apply" label="Apply">
              <Select
                style={{ width: "100%" }}
                showSearch
                onSearch={fetchApplyData}
                placeholder="Select an applies"
                optionFilterProp="children"
              >
                {applies?.map((apply) => (
                  <Option key={apply._id} value={apply._id}>
                    {`${apply?.clientName} - ${apply?.companyName} `}
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

            <Form.Item name="companyInformation" label="Company Information">
              <Input.TextArea />
            </Form.Item>
          </div>
        </div>
        <Form.Item className="d-flex justify-content-end">
          <Button type="primary" htmlType="submit">
            Add Event
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default CreateEventDrawer;
