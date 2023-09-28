import React from "react";
import { Button, Layout, Menu } from "antd";
import { Link, useLocation } from "react-router-dom"; // Importing Link and useLocation from react-router-dom
import { SidebarMenu, StyledMenuItem, StyledSider } from "./styled";
import { sidebarMenuItems } from "./sidebarMenuItems";
import { styled } from "styled-components";


const Logo = styled.div`
  height: 32px;
  margin: 16px;
  color: white;
`;


const Sidebar = ({ collapsed, setCollapsed }) => {
    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Logo>
                    <h4>Enigma</h4>
                </Logo>
              
            </div>
            <SidebarMenu defaultSelectedKeys={['1']}>
                {sidebarMenuItems?.map((menuItem) => {
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
