import React from "react";
import { Layout } from "antd";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { StyledContent, StyledHeader, StyledSider } from "./styled";
import Sidebar from "src/components/Sidebar";
import Topbar from "src/components/Topbar";
import { Outlet } from "react-router-dom";
import AttendanceTabs from "src/features/AttendanceFeature/AttandanceDashboard/AttendanceTabs";
import { useSelector } from "react-redux";
import { getLogedInUser } from "src/store/slices/authSlice/selectors";
import ProjectDailyUpdateTabs from "src/features/ProjectDailyUpdate/ProjectDailyUpdateTabs";

const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();


  const authUser = useSelector(getLogedInUser)

  const userRole = authUser?.role

  const isAttendanceRoute = location.pathname.includes("attendance") && (userRole === 'admin' || userRole === 'hr')
  const isProjectDailyUpdates = location.pathname.includes("project-daily-updates") && (userRole === 'admin' || userRole === 'hr' || userRole === 'user' || userRole === 'sales_executive' || userRole === 'project_manager')


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
          {isProjectDailyUpdates && <ProjectDailyUpdateTabs/>}

          <Outlet />
        </StyledContent>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
