import { Button, Tabs } from "antd";
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { routes } from "src/constant/routes";

const AttendanceTabs = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const items = [
    {
      key: routes.ATTENDANCE_DASHBOARD,
      label: "Attendance Dashboard",
    },
    {
      key: routes.ATTENDANCE_REPORTS,
      label: "Reports",
    },
    {
      key: routes.USER_ATTENDANCE_COUNT,
      label: "Reports Count",
    },
  ];

  // Find the key based on the current URL
  const defaultActiveKey =
    items.find((item) => location.pathname.includes(item.key))?.key || "1";

  const onChange = (key) => {
    navigate(key);
  };

  return (
    <div>
      <Tabs
        defaultActiveKey={defaultActiveKey}
        items={items}
        onChange={onChange}
        tabBarExtraContent={
          <Button onClick={() => navigate(routes.ATTENDANCE_SUBMISSION)}>
            Mark Attendance
          </Button>
        }
      />
    </div>
  );
};

export default AttendanceTabs;
