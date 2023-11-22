import React from "react";
import { Badge, Button, Form, Select } from "antd";
import { useDispatch } from "react-redux";
import { submitAttendanceApi } from "src/store/slices/attendanceSlice/GetAttendanceSlice/api";
import { CardImage, ImageWrapper, InnerCard, StyledCarousel } from "../styled";
import avatar from "../../../assets/avatar.jpg";
import TextArea from "antd/es/input/TextArea";
import { format } from "date-fns";

const AttendanceSlider = ({ users, attendanceDate }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const initialValues = {
    status: "present",
    notes: ''
  };

  const handlePresent = async (userId) => {
    try {
      const values = await form.validateFields();
      const data = {
        user: userId,
        date: format(new Date(attendanceDate), 'yyyy-MM-dd'),
        status: values?.status,
        checkInTime: (values.status === 'late' || values.status === 'present' || values.status === 'half-day') ? new Date() : null,
        notes: values?.notes,
      };

      await dispatch(submitAttendanceApi(data));
    } catch (err) {
      console.log(err);
    }
  };

  let settings = {
    slidesToShow: 4,
    infinite: false,
    slidesToScroll: 2,
  };

  if (!users?.length) {
    return <div style={{
      background: "#F1F2F3",
      marginBottom: "20px",
      padding: '20px'

    }}>
      <h4>All Users have sbubmitted attendance</h4>
    </div>;
  }

  return (
    <StyledCarousel
      style={{
        background: "#F1F2F3",
        marginBottom: "20px",
      }}
      {...settings}
    >
      {users?.map((user) => (
        <div key={user?._id}>
          <InnerCard>
            <Badge.Ribbon style={{ right: 20 }} text={user?.role} color="green">
              <ImageWrapper style={{ height: "1vh" }}>
                <CardImage src={avatar} alt="Avatar" />
              </ImageWrapper>

              <Form form={form} initialValues={initialValues} >
                <div
                  style={{
                    margin: "10px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "30px",
                  }}
                >
                  <h5>
                    {user?.first_name} {user?.last_name}
                  </h5>
                  <Form.Item name="status">
                    <Select
                      dropdownStyle={{
                        background: "#e4eefc",
                        fontSize: "25px",
                      }}
                      showSearch
                      size="large"
                      options={[
                        { value: "present", label: "Present" },
                        { value: "absent", label: "Absent" },
                        { value: "late", label: "Late" },
                        { value: "leave", label: "Leave" },
                        { value: "half-day", label: "Half-day" },
                        { value: "vacation", label: "Vacation" },
                      ]}
                    />
                  </Form.Item>

                  <Form.Item name={'notes'}>
                    <div>
                      <h6>Notes:</h6>
                      <TextArea rows={3} />
                    </div>
                  </Form.Item>

                  <Button type="primary" onClick={() => handlePresent(user?._id)}>
                    Submit
                  </Button>
                </div>
              </Form>
            </Badge.Ribbon>
          </InnerCard>
        </div>
      ))}
    </StyledCarousel>
  );
};

export default AttendanceSlider;
