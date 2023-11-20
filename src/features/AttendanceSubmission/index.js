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
import { DatePicker, Flex, Input, Table } from "antd";
import DeleteButton from "src/components/buttons/DeleteButton";
import { MainWrapper, SearchInput } from "./styled";
import EditButton from "src/components/buttons/EditButton";
import EditAttendanceModal from './EditAttendanceModal/index'
import { format } from "date-fns";
import { setSelectedAttendance } from "src/store/slices/attendanceSlice/GetAttendanceSlice";

const AttendanceSubmission = () => {
  const [filterdUsers, setFilterdUsers] = useState([]);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const users = useSelector(getAllUsers);
  const todayAllAttendance = useSelector(getAllAttendance);

  const dispatch = useDispatch();
  const { Search } = Input;

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
      date: new Date(),
    });
    dispatch(getAllAttendanceApi(queryParams));
  }, [users]);

  const handleDelete = (id) => {
    dispatch(deleteAttendance(id));
  };

  const handleEdit = (record, e) => {
    e.stopPropagation();
    dispatch(setSelectedAttendance(record))
    setSelectedRecord(record);
    setIsEditModalVisible(true);
  };

  const handleModalClose = () => {
    setIsEditModalVisible(false);
    dispatch(setSelectedAttendance(null));
    setSelectedRecord(null);
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
      render: (text, record) => format(new Date(record.checkInTime), "p"),
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
          <EditButton onClick={(e) => handleEdit(record, e)} />
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

  const handleChange = (value) => {
    if (value.trim() === "") {
      const filteredUsers = users?.filter(
        (user) =>
          !todayAllAttendance
            ?.map((record) =>
              record.user?._id ? record?.user?._id : record?.user
            )
            .includes(user?._id)
      );

      setFilterdUsers(filteredUsers);
    } else {
      const dd = users.filter((u) =>
        u.first_name.toLowerCase().includes(value.toLowerCase())
      );
      setFilterdUsers(dd);
    }
  };

  const range = (start, end) => {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  };

  // const disabledDate = (current) => {
  //   // Can not select days before today and today
  //   return current && current < dayjs().endOf('day');
  // };

  // const disabledDateTime = () => ({
  //   disabledHours: () => range(0, 24).splice(4, 20),
  //   disabledMinutes: () => range(30, 60),
  //   disabledSeconds: () => [55, 56],
  // });

  const handleDateTimeChange = (value) => {
    setSelectedDate(value)
  }

  return (
    <>
      <MainWrapper>
        <Flex gap={"50px"}>
          <Search
            placeholder="input search text"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={(value) => handleChange(value)}
            style={{ width: "300px", marginBottom: "40px" }}
          />

          {/* <DatePicker
            format="YYYY-MM-DD HH:mm:ss"

            showTime={{
              defaultValue: dayjs('00:00:00', 'HH:mm:ss'),
            }}
            style={{ height: "40px" }}
            onChange={handleDateTimeChange}
          /> */}
        </Flex>


      </MainWrapper>
      <div>
        <AttendanceSlider users={filterdUsers} attendanceDate={selectedDate} />
        <Table
          dataSource={todayAllAttendance}
          columns={columns}
          pagination={false}
        />
      </div>
      <EditAttendanceModal
        visible={isEditModalVisible}
        onClose={handleModalClose}
        record={selectedRecord} />
    </>
  );
};

export default AttendanceSubmission;
