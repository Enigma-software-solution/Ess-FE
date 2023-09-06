import React from "react";
// import "antd/dist/antd.css";
import { Layout, Menu } from "antd";
import { useState } from "react";
import { StyledContent, StyledHeader, StyledSider } from "./styled";
import Sidebar from "src/components/Sidebar";
import Topbar from "src/components/Topbar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout>
      <StyledSider collapsed={collapsed}>
        <Sidebar setCollapsed={setCollapsed}  collapsed={collapsed}/>
      </StyledSider>
      <Layout style={{marginLeft:'12px'}}>
        <StyledHeader>
          <Topbar  setCollapsed={setCollapsed}  collapsed={collapsed}/>
        </StyledHeader>
        <StyledContent>
          <Outlet />
        </StyledContent>
      </Layout>
    </Layout>
  );
};


export default DashboardLayout