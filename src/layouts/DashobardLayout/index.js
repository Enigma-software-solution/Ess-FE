import React from "react";
import { Layout } from "antd";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { StyledContent, StyledHeader, StyledSider } from "./styled";
import Sidebar from "src/components/Sidebar";
import Topbar from "src/components/Topbar";
import { Outlet } from "react-router-dom";
import AttendanceTabs from "src/features/AttandanceDashboard/AttendanceTabs";
import { useSelector } from "react-redux";
import { getLogedInUser } from "src/store/slices/authSlice/selectors";

const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();


  const authUser = useSelector(getLogedInUser)

  const userRole = authUser?.role

  const isAttendanceRoute = location.pathname.includes("attendance") && (userRole === 'admin' || userRole === 'hr')


  return (
    <Layout>
      <StyledSider collapsed={collapsed}>
        <Sidebar setCollapsed={setCollapsed} collapsed={collapsed} />
      </StyledSider>
      <Layout style={{ marginLeft: '12px', background: '#fff' }}>
        <StyledHeader>
          <Topbar setCollapsed={setCollapsed} collapsed={collapsed} />
        </StyledHeader>
        <StyledContent>

          {isAttendanceRoute && <AttendanceTabs />}

          <Outlet />
        </StyledContent>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
