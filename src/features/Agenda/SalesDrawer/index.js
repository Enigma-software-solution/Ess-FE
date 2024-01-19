import React, { useEffect, useState } from "react";
import { Drawer, Form, Button, Select, DatePicker, TimePicker, Space } from "antd";
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
  checkNotesDrawer,
  getSelectedEvent,
  isSalesDrawer,
} from "src/store/slices/agendaSlice/selector";
import { closeSalesDrawer, setSelectedEvent } from "src/store/slices/agendaSlice";
import { differenceInMinutes } from "date-fns";
import dayjs from "dayjs";
import { isEmpty } from "lodash";

const { Option } = Select;

const SalesEventDrawer = ({ selectedDate, setSelectedDate }) => {
  const dispatch = useDispatch();
  const isDrawer = useSelector(isSalesDrawer);
  const isEventDrawer = useSelector(checkNotesDrawer)
  const loggedInUser = useSelector(getLogedInUser);

  const selectedEvent = useSelector(getSelectedEvent);

  // const isEditable = !isEmpty(selectedEvent)

  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleClose = () => {
    dispatch(closeSalesDrawer());
  };

  let EditStartDate = null;
  let EditEndDate = null;

  const handleTimeChange = (dates, dateString) => {
    const updatedStartDate = dayjs(dates[0]);
    const updatedEndDate = dayjs(dates[1]);

    const durationInMinutes = differenceInMinutes(
      new Date(updatedEndDate),
      new Date(updatedStartDate)
    );

    if (selectedEvent) {
      console.log(updatedStartDate.$d, "ooo")
      console.log(updatedEndDate.$d, "ooo")
      EditStartDate = updatedStartDate.$d;
      EditEndDate = updatedEndDate.$d;
      form.setFieldsValue({
        callDuration: durationInMinutes.toString() + "min",
      });

    } else if (selectedDate) {

      setSelectedDate({
        start: updatedStartDate.format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ"),
        end: updatedEndDate.format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ"),
      });
    }
  };

  const handleSubmit = async (values) => {
    setLoading(true);

    const CreateData = {
      createdBy: loggedInUser.id,
      start: new Date(selectedDate.start).toString(),
      end: new Date(selectedDate.end).toString(),
      ...values,
      eventType: "salesCall",
    };
    const updateData = {
      createdBy: loggedInUser.id,
      start: EditStartDate,
      end: EditEndDate,
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

      if (isEventDrawer) {
        await form.resetFields();
      }
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

      if (selectedDate?.start && selectedDate?.end) {
        const startTime = dayjs(selectedDate.start);
        const endTime = dayjs(selectedDate.end);

        form.setFieldsValue({
          timeRange: [startTime, endTime],
        });
      }
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
        initialValues={initialValues}
      >
        <div className="d-flex justify-content-end align-items-end flex-column mb-3 ">

          <p>Date: {selectedEvent ? formatDate(selectedEvent?.start) : formatDate(selectedDate?.start)}</p>

          <div className="mt-2 ">
            <span>Time :  </span>
            <TimePicker.RangePicker
              format="hh:mm A"
              defaultValue={
                selectedEvent
                  ? [dayjs(selectedEvent.start), dayjs(selectedEvent.end)]
                  : selectedDate
                    ? [dayjs(selectedDate.start), dayjs(selectedDate.end)]
                    : null
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

export default SalesEventDrawer;
