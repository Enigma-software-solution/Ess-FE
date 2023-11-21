import { Badge, Button, Select } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { submitAttendanceApi } from "src/store/slices/attendanceSlice/GetAttendanceSlice/api";
import { CardImage, ImageWrapper, InnerCard, StyledCarousel } from "../styled";
import avatar from "../../../assets/avatar.jpg";
import TextArea from "antd/es/input/TextArea";

const AttendanceSlider = ({ users, attendanceDate }) => {
  const dispatch = useDispatch();
  const [selectedValue, setSelectedValue] = useState("present");
  const [notes, setNotes] = useState([]);

  const currentDate = new Date();

  const handlePresent = async (userId) => {
    const data = {
      user: userId,
      date: new Date(attendanceDate),
      status: selectedValue,
      checkInTime: new Date(),
      notes: notes[userId],
    };

    try {
      const response = await dispatch(submitAttendanceApi(data));
    } catch (err) {
      console.log(err);
    } finally {
    }
  };

  const handleChange = (value) => {
    setSelectedValue(value);
  };

  let settings = {
    slidesToShow: 5,
    infinite: false,
    slidesToScroll: 2,
  };

  return (
    <StyledCarousel

      style={{
        background: '#F1F2F3',
        marginBottom: "20px",
      }}
      {...settings}
    >
      {users?.map((user) => (
        <div>
          <InnerCard key={user?._id} >
            <Badge.Ribbon style={{ right: 20 }} text={user?.role} color="green">
              <ImageWrapper style={{ height: "1vh" }}>
                <CardImage
                  src={avatar}
                  alt="Avatar"
                />
              </ImageWrapper>
              <div>
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
                  <Select
                    dropdownStyle={{
                      background: "#e4eefc",
                      fontSize: "25px",
                    }}
                    showSearch
                    defaultValue={selectedValue}
                    size="large"
                    onChange={(value) => handleChange(value, user?._id)}
                    options={[
                      { value: "present", label: "Present" },
                      { value: "absent", label: "Absent" },
                      { value: "late", label: "Late" },
                      { value: "leave", label: "Leave" },
                      { value: "half-day", label: "Half-day" },
                      { value: "vacation", label: "Vacation" },
                    ]}
                  />

                  <div>
                    <h6>Notes:</h6>
                    <TextArea rows={3}
                      value={notes[user?._id] || ""}
                      onChange={(e) =>
                        setNotes((prevReasons) => ({
                          ...prevReasons,
                          [user?._id]: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <Button type="primary" onClick={() => handlePresent(user?._id)}>
                    Submit
                  </Button>
                </div>
              </div>
            </Badge.Ribbon>
          </InnerCard>
        </div>
      ))}
    </StyledCarousel>
  );
};

export default AttendanceSlider;
