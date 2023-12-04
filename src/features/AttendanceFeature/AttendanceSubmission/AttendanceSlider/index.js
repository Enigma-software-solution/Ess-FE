import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { submitAttendanceApi } from "src/store/slices/attendanceSlice/GetAttendanceSlice/api";
import { StyledCarousel } from "../styled";
import MarkCard from "../MarkCard";


const AttendanceSlider = ({ users, attendanceDate }) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = (data) => {
    setIsLoading(true);
    dispatch(submitAttendanceApi(data))
      .finally(() => {
        setIsLoading(false);
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
        <MarkCard
          key={user?._id}
          user={user}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
        />
      ))}
    </StyledCarousel>
  );
};

export default AttendanceSlider;
