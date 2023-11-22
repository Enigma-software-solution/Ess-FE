import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllAttendanceApi } from "src/store/slices/attendanceSlice/GetAttendanceSlice/api";
import { getAllUsersApi } from "src/store/slices/userSlice/apis";
import { getAllUsers } from "src/store/slices/userSlice/selectors";
import AttendanceSlider from "./AttendanceSlider";
import qs from "qs";
import { Flex, Input } from "antd";
import { format } from "date-fns";
import TodaySubmittedTable from "./TodaySubmittedTable";
import { getAllAttendance } from "src/store/slices/attendanceSlice/GetAttendanceSlice/selectors";

const AttendanceSubmission = () => {
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const dispatch = useDispatch();
  const { Search } = Input;

  const users = useSelector(getAllUsers);
  const todayAllAttendance = useSelector(getAllAttendance);


  const getTodayAllSubmittedAttendance = async () => {
    const params = qs.stringify({
      date: format(new Date(), "yyyy-MM-dd"),
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
    if (todayAllAttendance) {
      const nonSubmittedUsers = getNonSubmittedUsers();
      setFilteredUsers(nonSubmittedUsers);
    }
  }, [todayAllAttendance, users]);


  useEffect(() => {
    dispatch(getAllUsersApi());
    getTodayAllSubmittedAttendance();
  }, [dispatch]);

  return (
    <>
      <Flex justify="space-between" className="mt-2">
        <Search
          placeholder="Input search text"
          allowClear
          enterButton="Search"
          size="large"
          onChange={handleSearch}
          style={{ width: "300px", marginBottom: "40px" }}
        />
      </Flex>

      <div>
        <AttendanceSlider users={filteredUsers} attendanceDate={selectedDate} />
        <TodaySubmittedTable todayAllAttendance={todayAllAttendance} />
      </div>
    </>
  );
};

export default AttendanceSubmission;
