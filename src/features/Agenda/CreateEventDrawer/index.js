import React, { useEffect, useState } from "react";
import { Button, Form, Input, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Drawer } from "antd";
import { UpdateEventsApi, createEventsApi } from "src/store/slices/agendaSlice/apis";
import { CallTypeDropdown } from "src/constant/callTypes";
import { CallPlatformDropdown } from "src/constant/callplatform";
import { getLogedInUser } from "src/store/slices/authSlice/selectors";
import { checkSlotDrawer, getSelectEvent, } from "src/store/slices/agendaSlice/selector";
import { closeEventDrawer, closeSlotDrawer, setSelectedEvent } from "src/store/slices/agendaSlice";
import { getAllUsersApi } from "src/store/slices/userSlice/apis";
import ApplySelect from "./applySelect";
import CustomSelect from "src/components/formElements/CustomSelect";
import CustomInput from "src/components/formElements/CustomInput";
import { formatDate, formatTime } from "src/utils/formatsOfDate";

const { Option } = Select;

const CreateEventDrawer = ({ selectedDate }) => {
  const [form] = Form.useForm();

  const dispatch = useDispatch();

  const isDrawer = useSelector(checkSlotDrawer);
  const selectedEvent = useSelector(getSelectEvent);
  const loggedInUser = useSelector(getLogedInUser);

  const onClose = () => {
    form.resetFields();
    dispatch(closeSlotDrawer());
  };

  const handleCreateOrUpdateEvent = (values) => {
    const CreateData = {
      createdBy: loggedInUser.id,
      ...selectedDate,
      ...values,
    };

    const updateData = {
      createdBy: loggedInUser.id,
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
    dispatch(getAllUsersApi());
  }, []);

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
          <p>Date: {formatDate(selectedDate?.start)}</p>
          <p>Time: {formatTime(selectedDate.start)} - {formatTime(selectedDate.end)}</p>
        </div>

        <div className="d-flex justify-content-between mb-1">
          <div style={{ flex: 1, marginRight: "20px" }}>
            <CustomInput
              label="Call duration"
              name="callDuration"
              rules={[{ required: true }]}
              type="text"
            />
            <CustomInput
              label="Number of Guests"
              name="numOfGuests"
              type="number"
            />
            <CustomInput
              label="Mail Link"
              name="mailLink"
              rules={[{ required: true }]}
              type="text"
            />
            <CustomInput
              label="Call Link"
              name="callLink"
              rules={[{ required: true }]}
              type="text"
            />
          </div>
          <div style={{ flex: 1 }}>
            <CustomInput
              label="Call Type"
              name="callType"
              rules={[{ required: true }]}
              component={CustomSelect}
              options={CallTypeDropdown}
              placeholder="Select Call type"
            />
            <CustomInput
              label="Call Mode"
              name="callMode"
              component={Select}
            >
              <Option value="voice">Voice</Option>
              <Option value="video">Video</Option>
            </CustomInput>
            <CustomInput
              label="Call Platform"
              name="callPlatform"
              rules={[{ required: true }]}
              component={CustomSelect}
              options={CallPlatformDropdown}
              placeholder="Select call platform"
            />
            <CustomInput
              label="Apply"
              name="apply"
              rules={[{ required: true }]}
              component={ApplySelect}
              onSelect={(value) => form.setFieldsValue({ apply: value })}
            />
            <CustomInput
              label="Company Information"
              name="companyInformation"
              component={Input.TextArea}
            />
          </div>
        </div>
        <Form.Item className="d-flex justify-content-end">
          <Button type="primary" htmlType="submit">
            {selectedEvent ? "Update Event" : "Add Event"}
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};


export default CreateEventDrawer;
