import React, { useEffect, useState } from "react";
import { Button, Form, Input, Select } from "antd";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { Drawer } from "antd";
import { createEventsApi } from "src/store/slices/agenda/apis";
import { CallType } from "src/constant/callTypes";
import { CallPlatform } from "src/constant/callplatform";
import { getUserId } from "src/store/slices/authSlice/selectors";
import { getProfilesApi } from "src/store/slices/profielSlice/apis";
import { getAllProfiles } from "src/store/slices/profielSlice/selectors";
const { Option } = Select;

const CreateEventDrawer = ({
  selectedDate,
  isDrawerOpen,
  handleDrawerClose,
}) => {

  const [form] = Form.useForm();

  const dispatch = useDispatch();

  const allProfiles = useSelector(getAllProfiles);
  const userId = useSelector(getUserId);

  const handleReset = () => {
    form.resetFields();
  };

  const handleAddEvent = (values) => {
    const preparedData = {
      user: userId,
      ...selectedDate,
      ...values,
    };
    dispatch(createEventsApi(preparedData));
    handleReset();
    handleDrawerClose();
    console.log("Submitted values:", values);
  };


  useEffect(() => {
    if (!allProfiles?.length) {
      dispatch(getProfilesApi());
    }
  }, [dispatch, allProfiles]);

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
        <Form
          name="event-form"
          onFinish={handleAddEvent}
          form={form}
        >
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
                name="callDurition"
                label="Call duration"
                rules={[{ required: true }]}
              >
                <Input type="text" />
              </Form.Item>
              <Form.Item
                name="numOfGuests"
                label="Number of Guests"
                rules={[{ required: true }]}
              >
                <Input type="number" />
              </Form.Item>
              <Form.Item name="callMode" label="Call Mode">
                <Select>
                  <Option value="voice">Voice</Option>
                  <Option value="video">Video</Option>
                </Select>
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
              <Form.Item name="initialConversion" label="Initial Conversation">
                <Input.TextArea />
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
