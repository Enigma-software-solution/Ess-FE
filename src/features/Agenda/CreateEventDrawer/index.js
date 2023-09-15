import React, { useEffect, useState } from "react";
import { Button, Form, Input, Select } from "antd";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { Drawer } from "antd";
import { UpdateEventsApi, createEventsApi } from "src/store/slices/agenda/apis";
import { CallType } from "src/constant/callTypes";
import { CallPlatform } from "src/constant/callplatform";
import { getUserId } from "src/store/slices/authSlice/selectors";
import { getProfilesApi } from "src/store/slices/profielSlice/apis";
import { getAllProfiles } from "src/store/slices/profielSlice/selectors";
import { getSelectEvent } from "src/store/slices/agenda/selector";
const { Option } = Select;

const CreateEventDrawer = ({
  selectedDate,
  isDrawerOpen,
  handleDrawerClose,
}) => {
  const [form] = Form.useForm();

  const initialFormValues = {};

  const dispatch = useDispatch();
  const selectedEvent = useSelector(getSelectEvent)

  const allProfiles = useSelector(getAllProfiles);
  const userId = useSelector(getUserId);

  const handleReset = () => {
    form.resetFields();
  };

  const handleCreateOrUpdateEvent = (values) => {
    const preparedData = {
      user: userId,
      ...selectedDate,
      ...values,
    };

    const preparedDataForEdit = {
      user: userId,
      start:selectedEvent.start,
      end:selectedEvent.end,
      ...values,
    };
    if (selectedEvent) {
      // If selectedEvent exists, update the event
      dispatch(
        UpdateEventsApi({
          eventId: selectedEvent._id, // Use the correct property to get the event ID
          ...preparedDataForEdit,
        })
      );
    } else {
      // Otherwise, create a new event
      dispatch(createEventsApi(preparedData));
    }
    handleReset();
    handleDrawerClose();
  };

  useEffect(() => {
    if (!allProfiles?.length) {
      dispatch(getProfilesApi());
    }
  }, [dispatch, allProfiles]);

  console.log(selectedEvent, "selectedEventselectedEvent")


  useEffect(() => {
    if (selectedEvent) {
      const {
        companyName,
        jobTitle,
        callDuration,
        numOfGuests,
        callMode,
        callType,
        callPlatform,
        profile,
        companyInformation,
      } = selectedEvent;

      form.setFieldsValue({
        companyName,
        jobTitle,
        callDuration,
        numOfGuests,
        callMode,
        callType,
        callPlatform,
        profile,
        companyInformation,
      });
    } else {
      form.setFieldsValue(initialFormValues);
    }
  }, [selectedEvent, form]);

  return (
    <>
      <Drawer
        title="Add Event"
        placement="right"
        closable={true}
        onClose={handleDrawerClose}
        open={isDrawerOpen}
        width={860}
     
      >
        <div className="d-flex justify-content-end align-items-end flex-column  mb-1">
          <p>Date: {format(new Date(selectedDate?.start), "dd-MM-yyyy")}</p>
          <p>
            Time: {format(new Date(selectedDate.start), "p")} -{" "}
            {format(new Date(selectedDate.end), "p")}
          </p>
        </div>
        <Form name="event-form" onFinish={handleCreateOrUpdateEvent} form={form}>
          <div className="d-flex justify-content-between mb-1">
            <div style={{ flex: 1, marginRight: "20px" }}>
              {/* Left column of form fields */}
              <Form.Item
                name="companyName"
                label="Company name"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="jobTitle"
                label="Job title"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="callDuration"
                label="Call duration"
                rules={[{ required: true }]}
              >
                <Input type="text" />
              </Form.Item>
              <Form.Item
                name="numOfGuests"
                label="Number of Guests"
            
              >
                <Input type="number" />
              </Form.Item>

              <Form.Item name="mailLink" label="Mail Link">
                <Input type="text" />
              </Form.Item>
           
            </div>
            <div style={{ flex: 1 }}>
              {/* Right column of form fields */}
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
              <Form.Item
                name="profile"
                label="Profile"
                rules={[
                  { required: true, message: "Please select the Profile" },
                ]}
              >
                <Select placeholder="Please select a Profile">
                  {allProfiles?.map((profile) => (
                    <Option key={profile?._id} value={profile?._id}>
                      {profile?.name}
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
    </>
  );
};

export default CreateEventDrawer;
