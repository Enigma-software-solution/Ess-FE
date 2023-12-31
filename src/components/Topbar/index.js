import React from "react";
import { FaAngleRight, FaAngleLeft, FaAngleDown } from "react-icons/fa";
import { Avatar, Dropdown, Menu } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { ToggleButton } from "./styled";
import { routes } from "src/constant/routes";
import { useSelector } from "react-redux";
import { getLogedInUser } from "src/store/slices/authSlice/selectors";
import { DownOutlined } from "@ant-design/icons";
import { capitalize } from "lodash";
import AvatarPic from 'src/assets/avatar1.jpg'


const Topbar = ({ setCollapsed, collapsed }) => {
  const loggedInUser = useSelector(getLogedInUser)
  const navigate = useNavigate();
  const handleButtonClick = (loggedInUser) => {
    navigate(`${routes?.USER_ATTENDANCE_DETAILS}/${loggedInUser?.id}`);
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh_token");
    navigate("/login");
  };
  const menu = (
    <Menu>
      <Menu.Item key="1">
        <Link to={routes?.PROFILE_SETTINGS}>Settings</Link>
      </Menu.Item>
      <Menu.Item key="2" onClick={() => handleButtonClick(loggedInUser)}>
        Attendance
      </Menu.Item>
      <Menu.Item key="3" onClick={() => handleLogout()}>
        Log out
      </Menu.Item>
    </Menu>
  );

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <ToggleButton onClick={() => setCollapsed((prev) => !prev)}>
        {collapsed ? <FaAngleRight size="20px" /> : <FaAngleLeft size="20px" />}
      </ToggleButton>

      <Dropdown overlay={menu} trigger={['click']} >
        <div className="d-flex justify-content-center align-items-center gap-2 "
          style={{ cursor: 'pointer' }}>
          <Avatar
            size="large"
            src={loggedInUser?.profile_pic ?? AvatarPic}
            style={{ border: "1px solid lightgray" }}
          />
          <span style={{ fontWeight: 'bold' }}>{loggedInUser && loggedInUser?.first_name && capitalize(loggedInUser.first_name)}</span>

          <FaAngleDown fontSize={'18px'} />
        </div>
      </Dropdown>
    </div>
  );
};

export default Topbar;
