import React, { useEffect, useState } from "react";
import { Badge, Carousel, Select, Table } from "antd";
import avatar from "../../assets/avatar.jpg";
import {
  ImageWrapper,
  InnerCard,
  SearchInput,
  SearchWrapper,
  SubmitButton,
  CardWrapper,
} from "./styled";
import { getAllUsersApi } from "src/store/slices/userSlice/apis";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "src/store/slices/userSlice/selectors";
import DeleteButton from "src/components/buttons/DeleteButton";
import { submitAttendanceApi } from "src/store/slices/attendanceSlice/GetAttendanceSlice/api";
import { toast } from "react-toastify";

const Attendance = () => {
  const users = useSelector(getAllUsers);
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [searchTerm, setSearchTerm] = useState("");
  const [presentUsers, setPresentUsers] = useState([]);
  const dispatch = useDispatch();
  const [selectedValue, setSelectedValue] = useState("");
  const [reason, setReason] = useState({});

  useEffect(() => {
    dispatch(getAllUsersApi());
    setFilteredUsers(users);
  }, []);

  useEffect(() => {
    setFilteredUsers(users);
  }, [users]);

  const imageStyle = {
    borderRadius: "50%",
    boxShadow: "-4px -4px 119px -16px rgba(0,0,0,0.75)",
  };

  let settings = {
    slidesToShow: 5,
    arrows: false,
    infinite: false,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 8000,
    lazyLoad: true,
  };

  const currentTime = new Date();
  const nextDay = new Date(currentTime);
  nextDay.setDate(currentTime.getDate() + 1);

  const handleChange = (value, id) => {
    setSelectedValue(value);
  };

  const handleSearchChange = (e) => {
    const { value } = e.target;
    setSearchTerm(value);

    if (value === "") {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(
        (user) =>
          user.first_name.toLowerCase().includes(value.toLowerCase()) ||
          user.last_name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  };

  const handlePresent = (userId) => {
    const user = filteredUsers.find((u) => u._id === userId);
    const userReason = reason[userId];

    if (user) {
      setPresentUsers((prevUsers) => [...prevUsers, user]);
      setFilteredUsers((prevUsers) =>
        prevUsers.filter((u) => u._id !== userId)
      );
    }
    const prepareduser = {
      user: userId,
      date: nextDay,
      status: selectedValue || "present",
      checkInTime: nextDay,
      notes: userReason || "",
    };

    const response = dispatch(submitAttendanceApi(prepareduser));
    if (response.status === "success") {
      toast.warn("Attendance Submitted");
    }
    if (response.status === "pending") {
      toast.warn("Attendance Pending");
    }
  };

  const handleDelete = (userId) => {
    const user = presentUsers.find((u) => u._id === userId);

    if (user) {
      setFilteredUsers((prevUsers) => [...prevUsers, user]);
      setPresentUsers((prevUsers) => prevUsers.filter((u) => u._id !== userId));
    }
  };

  const columns = [
    {
      title: "First Name",
      dataIndex: "first_name",
      key: "first_name",
    },
    {
      title: "Last Name",
      dataIndex: "last_name",
      key: "first_name",
    },
    {
      title: "Role",
      dataIndex: "role",
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
              handleDelete(record._id);
            }}
          >
            Delete
          </DeleteButton>
        </div>
      ),
    },
  ];
  const renderSlider = (users) => (
    <Carousel
      style={{
        background:
          "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 0%, rgba(0,212,255,1) 100%)",
      }}
      {...settings}
    >
      {users &&
        users?.map((user) => (
          <div>
            <InnerCard key={user?._id} hoverable>
              <Badge.Ribbon
                style={{ right: 20 }}
                text={user?.role}
                color="green"
              >
                <ImageWrapper>
                  <img
                    width={"100px"}
                    height={"100px"}
                    src={avatar}
                    style={imageStyle}
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
                      defaultValue="present"
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
                          height: "70px",
                        }}
                        value={reason[user._id] || ""}
                        onChange={(e) =>
                          setReason((prevReasons) => ({
                            ...prevReasons,
                            [user._id]: e.target.value,
                          }))
                        }
                      ></input>
                    </div>
                    <SubmitButton onClick={() => handlePresent(user._id)}>
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
  return (
    <>
      <SearchWrapper>
        <SearchInput
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </SearchWrapper>
      <CardWrapper>
        {renderSlider(filteredUsers)}
        {searchTerm && filteredUsers?.length === 0 && <p>No Employee Found</p>}
      </CardWrapper>
      <Table dataSource={presentUsers} columns={columns} />
    </>
  );
};

export default Attendance;
