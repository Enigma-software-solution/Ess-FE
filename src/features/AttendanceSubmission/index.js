import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAttendance,
  getAllAttendanceApi,
} from "src/store/slices/attendanceSlice/GetAttendanceSlice/api";
import { getAllUsersApi } from "src/store/slices/userSlice/apis";
import { getAllUsers } from "src/store/slices/userSlice/selectors";
import AttendanceSlider from "./AttendanceSlider";
import qs from "qs";
import { getAllAttendance } from "src/store/slices/attendanceSlice/GetAttendanceSlice/selectors";
import { Table } from "antd";
import DeleteButton from "src/components/buttons/DeleteButton";

const AttendanceSubmission = () => {
  const users = useSelector(getAllUsers);
  const todayAllAttendance = useSelector(getAllAttendance);

  const [filterdUsers, setFilterdUsers] = useState([]);

  const dispatch = useDispatch();

  const currentDate = new Date();
  const nextDay = new Date(currentDate);
  nextDay.setDate(currentDate.getDate() + 1);

  useEffect(() => {
    dispatch(getAllUsersApi());
  }, []);

  useEffect(() => {
    const filteredUsers = users?.filter(
      (user) =>
        !todayAllAttendance
          ?.map((record) =>
            record.user?._id ? record?.user?._id : record?.user
          )
          .includes(user?._id)
    );

    setFilterdUsers(filteredUsers);
  }, [users, todayAllAttendance]);

  useEffect(() => {
    const queryParams = qs.stringify({
      date: nextDay,
    });
    dispatch(getAllAttendanceApi(queryParams));
  }, [users]);

  const handleDelete = (id) => {
    dispatch(deleteAttendance(id));
  };

  const columns = [
    {
      title: "First Name",
      dataIndex: "user?.first_name",
      key: "first_name",
      render: (text, record) => record?.user?.first_name,
    },

    {
      title: "Last Name",
      dataIndex: "user?.last_name",
      key: "last_name",
      render: (text, record) => record?.user?.last_name,
    },
    {
      title: "Check In Time",
      dataIndex: "checkInTime",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      key: "action",
      title: "Action",
      dataIndex: "action",
      render: (text, record) => (
        <div className="d-flex gap-1">
          <DeleteButton
            onClick={() => {
              handleDelete(record?._id, record?.user?.first_name);
            }}
          >
            Delete
          </DeleteButton>
        </div>
      ),
    },
  ];
  return (
    <div>
      <AttendanceSlider users={filterdUsers} />
      <Table
        dataSource={todayAllAttendance}
        columns={columns}
        pagination={false}
      />
      ;
    </div>
  );
};

export default AttendanceSubmission;
