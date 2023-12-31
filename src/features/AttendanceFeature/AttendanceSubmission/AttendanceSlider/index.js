import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { submitAttendanceApi } from "src/store/slices/attendanceSlice/GetAttendanceSlice/api";
import MarkCard from "../MarkCard";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from "swiper/modules";



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


  return (
    <Swiper
      pagination={{ clickable: true }}
      modules={[Pagination]}
      slidesPerView={4}
      spaceBetween={10}
      grabCursor={true}
      style={{ padding: '30px', marginBottom: '40px' }}
    >
      {users?.filter((user) => user.status === "active").map((user) => (
        <SwiperSlide>
          <MarkCard
            key={user?._id}
            user={user}
            handleSubmit={handleSubmit}
            attendanceDate={attendanceDate}
            isLoading={isLoading}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default AttendanceSlider;
