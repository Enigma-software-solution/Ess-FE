import React from "react";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import { Avatar, Dropdown, Menu } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { ToggleButton } from "./styled";
import { routes } from "src/constant/routes";
import { useSelector } from "react-redux";
import { getLogedInUser } from "src/store/slices/authSlice/selectors";

const Topbar = ({ setCollapsed, collapsed }) => {
  const loggedInUser = useSelector(getLogedInUser)

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh_token");
    navigate("/login");
  };

  const menu = (
    <Menu>
      <Menu.Item key="1">
        <Link to={routes.PROFILE_SETTINGS}>Settings</Link>
      </Menu.Item>
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

      <div className="d-flex justify-content-center align-items-center gap-2">
        <Dropdown overlay={menu}>
         <Avatar
            size={"large"}
            src="https://joesch.moe/api/v1/random"
            style={{ border: "1px solid lightgray" }}
          />
        </Dropdown>
        {loggedInUser && loggedInUser?.first_name}
      </div>
    </div>
  );
};

export default Topbar;
