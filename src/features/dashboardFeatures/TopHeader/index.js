import React from "react";
import { Card, Col, Row } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useTheme } from "styled-components";

const { Meta } = Card;

export const TopHeader = () => {
  const theme = useTheme();

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Card
            style={{  }}
            cover={
              <ShoppingCartOutlined
                style={{ fontSize: "64px", marginTop: "16px" }}
              />
            }
          >
            <Meta title="Column 2" description="Total orders: 20" />
          </Card>
        </Col>
        <Col span={6}>
          <Card
            style={{  }}
            cover={
              <ShoppingCartOutlined
                style={{ fontSize: "64px", marginTop: "16px" }}
              />
            }
          >
            <Meta title="Column 2" description="Total orders: 20" />
          </Card>
        </Col>
        <Col span={6}>
          <Card
            style={{  }}
            cover={
              <ShoppingCartOutlined
                style={{ fontSize: "64px", marginTop: "16px" }}
              />
            }
          >
            <Meta title="Column 3" description="Total orders: 30" />
          </Card>
        </Col>
        <Col span={6}>
          <Card
            style={{  }}
            cover={
              <ShoppingCartOutlined
                style={{ fontSize: "64px", marginTop: "16px" }}
              />
            }
          >
            <Meta title="Column 4" description="Total orders: 40" />
          </Card>
        </Col>
      </Row>
    </div>
  );
};
