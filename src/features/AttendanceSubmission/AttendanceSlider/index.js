import React, { useState } from "react";
import { Button, Form, Select } from "antd";
import { useDispatch } from "react-redux";
import { submitAttendanceApi } from "src/store/slices/attendanceSlice/GetAttendanceSlice/api";
import { CardImage, ImageWrapper, InnerCard, StyledCarousel } from "../styled";
import avatar from "../../../assets/avatar.jpg";
import TextArea from "antd/es/input/TextArea";
import { format } from "date-fns";

const STATUS_OPTIONS = [
  { value: "present", label: "Present" },
  { value: "absent", label: "Absent" },
  { value: "late", label: "Late" },
  { value: "leave", label: "Leave" },
  { value: "half-day", label: "Half-day" },
  { value: "vacation", label: "Vacation" },
];

const DATE_FORMAT = 'yyyy-MM-dd';

const UserCard = ({ user, handlePresent, isLoading, selectedUser }) => {
  const [form] = Form.useForm();

  const initialValues = {
    status: "present",
    notes: '',
  };

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        const data = {
          user: user?._id,
          date: format(new Date(), DATE_FORMAT),
          status: values?.status,
          checkInTime: ['late', 'present', 'half-day'].includes(values?.status) ? new Date() : null,
          notes: values?.notes,
        };
        handlePresent(user, data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div key={user?._id}>
      <InnerCard>
        <ImageWrapper>
          <CardImage src={avatar} alt="Avatar" />
        </ImageWrapper>

        <h5 className="text-center pt-3 pb-4">
          {user?.first_name} {user?.last_name}
        </h5>

        <Form form={form} initialValues={initialValues}>
          <Form.Item name="status">
            <Select
              dropdownStyle={{ background: "#e4eefc", fontSize: "25px" }}
              showSearch
              size="large"
              options={STATUS_OPTIONS}
            />
          </Form.Item>

          <Form.Item name="notes">
            <label className="fw-bold">Notes:</label>
            <TextArea rows={3} />
          </Form.Item>

          <Button
            type="primary"
            onClick={handleSubmit}
            loading={user?._id === selectedUser?._id && isLoading}
            disabled={isLoading}
          >
            Submit
          </Button>
        </Form>
      </InnerCard>
    </div>
  );
};

const AttendanceSlider = ({ users, attendanceDate }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const dispatch = useDispatch();

  const handlePresent = (user, data) => {
    setIsLoading(true);
    dispatch(submitAttendanceApi(data))
      .finally(() => {
        setIsLoading(false);
        setSelectedUser(null);  
      });
  };
  if (!users?.length) {
    return (
      <div style={{ background: "#F1F2F3", marginBottom: "20px", padding: '20px' }}>
        <h4>No Users Found </h4>
      </div>
    );
  }

  let settings = {
    slidesToShow: 4,
    infinite: false,
    slidesToScroll: 2,
  };

  return (
    <StyledCarousel style={{ background: "#F1F2F3", marginBottom: "20px" }} {...settings}>
      {users?.filter((user) => user.status === "active").map((user) => (
        <UserCard
          key={user?._id}
          user={user}
          handlePresent={handlePresent}
          isLoading={isLoading}
          selectedUser={selectedUser}
        />
      ))}
    </StyledCarousel>
  );
};

export default AttendanceSlider;
