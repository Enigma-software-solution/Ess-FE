import { Badge, Carousel, Select } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { submitAttendanceApi } from "src/store/slices/attendanceSlice/GetAttendanceSlice/api";
import { CardImage, ImageWrapper, InnerCard, SubmitButton } from "../styled";
import avatar from "../../../assets/avatar.jpg";

const AttendanceSlider = ({ users }) => {
  const dispatch = useDispatch();
  const [selectedValue, setSelectedValue] = useState("present");
  const [notes, setNotes] = useState([]);

  const currentDate = new Date();

  const handlePresent = async (userId) => {
    const data = {
      user: userId,
      date: new Date(),
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
    slidesToShow: 4,
    arrows: false,
    infinite: false,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 8000,
    lazyLoad: true,
  };

  return (
    <Carousel
      style={{
        height: "75vh",
        background:
          "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 0%, rgba(0,212,255,1) 100%)",
        marginBottom: "50px",
      }}
      draggable={true}
      {...settings}
    >
      {users?.map((user) => (
        <div>
          <InnerCard key={user?._id} hoverable>
            <Badge.Ribbon style={{ right: 20 }} text={user?.role} color="green">
              <ImageWrapper style={{ height: "1vh" }}>
                <CardImage
                  width={"100px"}
                  height={"100px"}
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
                    <input
                      style={{
                        padding: "20px",
                        width: "100%",
                        borderRadius: "20px",
                        height: "40px",
                      }}
                      value={notes[user?._id] || ""}
                      onChange={(e) =>
                        setNotes((prevReasons) => ({
                          ...prevReasons,
                          [user?._id]: e.target.value,
                        }))
                      }
                    ></input>
                  </div>
                  <SubmitButton onClick={() => handlePresent(user?._id)}>
                    Submit
                  </SubmitButton>
                </div>
              </div>
            </Badge.Ribbon>
          </InnerCard>
        </div>
      ))}
    </Carousel>
  );
};

export default AttendanceSlider;
