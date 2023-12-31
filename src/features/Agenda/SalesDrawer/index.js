import React, { useEffect, useState } from "react";
import { Drawer, Form, Button, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import CustomInput from "src/components/formElements/CustomInput";
import CustomSelect from "src/components/formElements/CustomSelect";
import { formatDate, formatTime } from "src/utils/formatsOfDate";
import { getLogedInUser } from "src/store/slices/authSlice/selectors";
import {
  UpdateEventsApi,
  createEventsApi,
} from "src/store/slices/agendaSlice/apis";
import { CallTypeDropdown } from "src/constant/callTypes";
import { CallPlatformDropdown } from "src/constant/callplatform";
import ApplySelect from "./applySelect";
import {
  getSelectedEvent,
  isSalesDrawer,
} from "src/store/slices/agendaSlice/selector";
import { closeSalesDrawer } from "src/store/slices/agendaSlice";
import { differenceInMinutes } from "date-fns";

const { Option } = Select;

const ClientEventDrawer = ({ selectedDate }) => {
  const dispatch = useDispatch();
  const isDrawer = useSelector(isSalesDrawer);
  const loggedInUser = useSelector(getLogedInUser);

  const selectedEvent = useSelector(getSelectedEvent);

  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleClose = () => {
    dispatch(closeSalesDrawer());
  };

  const handleSubmit = async (values) => {
    setLoading(true);

    const CreateData = {
      createdBy: loggedInUser.id,
      ...selectedDate,
      ...values,
      eventType: "salesCall",
    };

    const updateData = {
      createdBy: loggedInUser.id,
      start: selectedEvent?.start,
      end: selectedEvent?.end,
      eventType: "salesCall",
      ...values,
    };

    try {
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

      await form.resetFields();
    } catch (error) {
    } finally {
      setLoading(false);
      dispatch(closeSalesDrawer());
    }
  };

  const initialValues = {
    callDuration: "",
    numOfGuests: "1",
    mailLink: "",
    callWith: "",
    callLink: "",
    callType: "",
    callMode: "",
    callPlatform: "",
    apply: "",
    companyInformation: "",
  };

  useEffect(() => {
    if (selectedEvent?._id) {
      form.setFieldsValue(selectedEvent);
    }

    if (!selectedEvent?._id && selectedDate?.start && selectedDate?.end) {
      const durationInMinutes = differenceInMinutes(
        new Date(selectedDate.end),
        new Date(selectedDate.start)
      );

      form.setFieldsValue({
        ...initialValues,
        callDuration: durationInMinutes.toString() + "min",
      });
    }
  }, [form, selectedEvent, selectedDate]);

  return (
    <Drawer
      zIndex={1001}
      title="Sales Call"
      placement="right"
      closable={true}
      onClose={handleClose}
      open={isDrawer}
      width={500}
      destroyOnClose
      extra={
        <div className="align-righ">
          <Button
            type="primary"
            htmlType="submit"
            onClick={() => form.submit()}
            loading={loading}
          >
            {selectedEvent ? "Update" : "Save"}
          </Button>
        </div>
      }
    >
      <Form
        name="event-form"
        onFinish={handleSubmit}
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
      >
        <div className="d-flex justify-content-end align-items-end flex-column mb-3 ">
          <p>Date: {formatDate(selectedDate?.start)}</p>
          <p>
            Time: {formatTime(selectedDate?.start)} -{" "}
            {formatTime(selectedDate?.end)}
          </p>
        </div>

        <CustomInput
          label="Call duration"
          name="callDuration"
          rules={[{ required: true }]}
          type="text"
        />

        {/* <CustomInput
          label="Call With"
          name="callWith"
          rules={[{ required: true }]}
          type="text"
        /> */}
        {/* 
        <CustomInput
          label="Number of Guests"
          name="numOfGuests"
          rules={[{ required: true }]}
          type="number"
        /> */}

        {/* <CustomInput
          label="Mail Link"
          name="mailLink"
          rules={[{ required: true }]}
          type="text"
        /> */}

        <CustomInput
          label="Call Link"
          name="callLink"
          rules={[{ required: true }]}
          type="text"
        />
        <CustomInput
          label="Call Type"
          name="callType"
          rules={[{ required: true }]}
          component={CustomSelect}
          options={CallTypeDropdown}
          placeholder="Select Call type"
        />
        {/* <CustomInput label="Call Mode" name="callMode" component={Select} rules={[{ required: true }]}>
          <Option value="voice">Voice</Option>
          <Option value="video">Video</Option>
          <Option value="other">Other</Option>
        </CustomInput> */}

        {/* <CustomInput
          label="Call Platform"
          name="callPlatform"
          rules={[{ required: true }]}
          component={CustomSelect}
          options={CallPlatformDropdown}
          placeholder="Select call platform"
        /> */}

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
          type="textArea"
        />
      </Form>
    </Drawer>
  );
};

export default ClientEventDrawer;
