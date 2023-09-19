import React from "react";
import { Card, Col, Row } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useTheme } from "styled-components";
import DashboardCard from "../Card";

const { Meta } = Card;

export const TopHeader = () => {
  const theme = useTheme();

  return (
    <div>
     <DashboardCard/>
    </div>
  );
};
