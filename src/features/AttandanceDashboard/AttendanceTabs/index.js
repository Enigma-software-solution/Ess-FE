import { Button, Tabs } from "antd";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { routes } from "src/constant/routes";

const AttendanceTabs = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeKey, setActiveKey] = useState("");
  const [isMarkAttendanceDisabled, setMarkAttendanceDisabled] = useState(false);

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

  useEffect(() => {
    // Find the key based on the current URL
    const foundKey =
      items.find((item) => location.pathname.includes(item.key))?.key || "1";
    setActiveKey(foundKey);
    setMarkAttendanceDisabled(location.pathname.includes(routes.ATTENDANCE_SUBMISSION));
  }, [location.pathname, items]);

  const onChange = (key) => {
    navigate(key);
  };

  const handleMarkAttendance = () => {
    navigate(routes.ATTENDANCE_SUBMISSION);
    setActiveKey(routes.ATTENDANCE_SUBMISSION); // Update activeKey when "Mark Attendance" button is clicked
    setMarkAttendanceDisabled(true);

  };

  return (
    <div>
      <Tabs
        activeKey={activeKey}
        onChange={onChange}
        tabBarExtraContent={
          <Button onClick={handleMarkAttendance} disabled={isMarkAttendanceDisabled} 
          style={{ cursor: isMarkAttendanceDisabled ? 'default' : 'pointer' }}>
            Mark Attendance
          </Button>
        }
      >
        {items.map((item) => (
          <Tabs.TabPane key={item.key} tab={item.label} />
        ))}
      </Tabs>
    </div>
  );
};

export default AttendanceTabs;
