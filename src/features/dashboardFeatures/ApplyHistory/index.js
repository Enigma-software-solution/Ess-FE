import React from "react";
import { Col, Row } from "antd";
import ApplyCard from "../Card";

const applyData = [
  {
    profileName: "Ali",
    applies: 30,
  },
  {
    profileName: "Hamza",
    applies: 40,
  },
  {
    profileName: "Ghuffran",
    applies: 20,
  },
  {
    profileName: "Jalal",
    applies: 50,
  },
];

export const ApplyHistory = () => {
  return (
    <>
      <h3 className="mb-3">Daily Applies History</h3>
      <Row gutter={8}>
        {applyData?.map((apply) => {
          return (
            <Col xs={24} sm={24} md={12} lg={6}  >
              <ApplyCard data={apply} />
            </Col>
          );
        })}
      </Row>
    </>
  );
};
