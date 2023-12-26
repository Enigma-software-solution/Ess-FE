import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllAttendanceApi } from "src/store/slices/attendanceSlice/GetAttendanceSlice/api";
import { getAllUsersApi } from "src/store/slices/userSlice/apis";
import { getAllUsers, isUserLoading } from "src/store/slices/userSlice/selectors";
import AttendanceSlider from "./AttendanceSlider";
import qs from "qs";
import { DatePicker, Flex, Input, Space } from "antd";
import { format } from "date-fns";
import TodaySubmittedTable from "./TodaySubmittedTable";
import { getAllAttendance } from "src/store/slices/attendanceSlice/GetAttendanceSlice/selectors";
import Loader from "src/components/Loader";
import dayjs from "dayjs";

const MarkAttendance = () => {
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const dispatch = useDispatch();
  const { Search } = Input;

  const users = useSelector(getAllUsers);
  const userLoading = useSelector(isUserLoading);
  const todayAllAttendance = useSelector(getAllAttendance);


  const getTodayAllSubmittedAttendance = async () => {
    const params = qs.stringify({
      date: format(selectedDate, "yyyy-MM-dd"),
      pageSize: 200
    });

    try {
      await dispatch(getAllAttendanceApi(params)).unwrap();
    } catch (err) {
      console.error("Error fetching attendance:", err);
    }
  };

  const getNonSubmittedUsers = () => {
    const submittedUserIds = todayAllAttendance?.attendance?.map(
      (attendance) => attendance?.user?._id
    );

    const nonSubmittedUsers = users?.filter(
      (user) => !submittedUserIds?.includes(user._id)
    );

    return nonSubmittedUsers;
  };

  const handleSearch = ({ target: { value } }) => {
    const nonSubmittedUsers = getNonSubmittedUsers();
    const filteredResults = nonSubmittedUsers?.filter((user) =>
      user?.first_name?.toLowerCase().includes(value.toLowerCase()) || user?.last_name?.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredUsers(filteredResults);
  };

  useEffect(() => {
    const nonSubmittedUsers = getNonSubmittedUsers();
    setFilteredUsers(nonSubmittedUsers);
  }, [todayAllAttendance, users]);


  useEffect(() => {
    dispatch(getAllUsersApi());
    getTodayAllSubmittedAttendance();
  }, [dispatch, selectedDate]);

  const handleDateChange = (e) => {
    setSelectedDate(new Date(e))
  }

  return (
    <>
      <Flex justify="space-between" align="center" >
        <DatePicker onChange={handleDateChange} allowClear={false} value={dayjs(selectedDate)} defaultValue={dayjs()} />
        <Search
          placeholder="Input search text"
          allowClear
          enterButton="Search"
          size="large"
          onChange={handleSearch}
          style={{ width: "300px" }}
        />
      </Flex>
      {
        userLoading || !todayAllAttendance
          ? <Loader />
          : <div>
            <AttendanceSlider users={filteredUsers} attendanceDate={selectedDate} />
            <TodaySubmittedTable todayAllAttendance={todayAllAttendance} />
          </div>

      }
    </>
  );
};

export default MarkAttendance;
