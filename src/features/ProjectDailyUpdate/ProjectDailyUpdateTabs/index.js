import { Tabs } from "antd";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { routes } from "src/constant/routes";

const ProjectDailyUpdateTabs = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeKey, setActiveKey] = useState("");

  const items = [
    {
      key: routes.NEW_UPDATE,
      label: "New Updates",
    },
    {
      key: routes.UPDATE_HISTORY,
      label: "Updates History",
    },
  ];


  useEffect(() => {
    const foundKey =
      items?.find((item) => location.pathname.includes(item?.key))?.key || "1";
    setActiveKey(foundKey);
  }, [location?.pathname, items]);

  const onChange = (key) => {
    navigate(key);
  };


  return (
    <div>
      <Tabs
        activeKey={activeKey}
        onChange={onChange}
      >
        {items?.map((item) => (
          <Tabs.TabPane key={item?.key} tab={item?.label} />
        ))}
      </Tabs>
      
    </div>
  );
};

export default ProjectDailyUpdateTabs;
