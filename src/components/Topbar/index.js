import React, { useEffect } from "react";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import { Avatar, Dropdown, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import { ToggleButton } from "./styled";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "src/store/slices/authSlice/apis";
import { getLogedInUser } from "src/store/slices/authSlice/selectors";

const Topbar = ({ setCollapsed, collapsed }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(getLogedInUser);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh_token");
    navigate("/login");
  };

  useEffect(() => {
    dispatch(loginUser());
  }, []);

  const menu = (
    <Menu>
      <Menu.Item disabled key="welcome">
        Welcome {user.first_name} {user.last_name}
      </Menu.Item>
      <Menu.Item key="settings">Settings</Menu.Item>
      <Menu.Item key="logout" onClick={() => handleLogout()}>
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
      <Dropdown overlay={menu} placement="bottomRight">
        <Avatar
          size={"large"}
          src="https://joesch.moe/api/v1/random"
          style={{ border: "1px solid lightgray", cursor: "pointer" }}
        />
      </Dropdown>
    </div>
  );
};

export default Topbar;
