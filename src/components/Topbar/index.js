import React from "react";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import { Avatar, Dropdown, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import { ToggleButton } from "./styled";

const Topbar = ({ setCollapsed, collapsed }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh_token");
    navigate("/login");
  };

  const menu = (
    <Menu>
      <Menu.Item key="1">settings</Menu.Item>
      <Menu.Item key="2" onClick={() => handleLogout()}>
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
      <Dropdown overlay={menu}>
        <Avatar
          size={"large"}
          src="https://joesch.moe/api/v1/random"
          style={{ border: "1px solid lightgray" }}
        />
      </Dropdown>
    </div>
  );
};

export default Topbar;
