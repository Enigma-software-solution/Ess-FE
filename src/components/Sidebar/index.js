import React from "react";
import { Button, Layout, Menu } from "antd";
import { Link, useLocation } from "react-router-dom"; // Importing Link and useLocation from react-router-dom
import { SidebarMenu, StyledMenuItem, StyledSider } from "./styled";
import { sidebarMenuItems } from "./sidebarMenuItems";
import { styled } from "styled-components";
import { useSelector } from "react-redux";
import { getLogedInUser } from "src/store/slices/authSlice/selectors";

const Logo = styled.div`
  height: 32px;
  margin: 16px;
  color: white;

  h4 {
    transition: all 0.3s ease;
  }

  h4.collapsed {
    transform: scale(0.8);
    opacity: 0.7;
  }
`;

const Sidebar = ({ collapsed, setCollapsed }) => {

  const loggedInUserRole = useSelector(getLogedInUser)?.role

  const filteredMenuItems = sidebarMenuItems.filter((menuItem) =>
    menuItem.roles.includes(loggedInUserRole)
  );

  // console.log(filteredMenuItems, 'ssss')
  // console.log(loggedInUserRole, 'loggedInUserRole')


  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Logo>
          <h4 className={collapsed ? "collapsed" : ""}>
            {collapsed ? "ESS" : "Enigma"}
          </h4>
        </Logo>
      </div>
      <SidebarMenu defaultSelectedKeys={["1"]}>
        {filteredMenuItems?.map((menuItem) => {
          if (menuItem.subMenu) {
            return (
              <Menu.SubMenu
                key={menuItem.key}
                icon={menuItem.icon}
                title={menuItem.title}
              >
                {menuItem.subMenu.map((subMenuItem) => (
                  <Menu.Item key={subMenuItem.key}>
                    <Link to={subMenuItem.path}>{subMenuItem.title}</Link>
                  </Menu.Item>
                ))}
              </Menu.SubMenu>
            );
          } else {
            return (
              <Menu.Item key={menuItem.key} icon={menuItem.icon}>
                <Link to={menuItem.path}>{menuItem.title}</Link>
              </Menu.Item>
            );
          }
        })}
      </SidebarMenu>
    </>
  );
};

export default Sidebar;
