import React, { useEffect } from "react";
import { Avatar, Col, Flex, Row } from "antd";
import ApplyCard from "../Card";
import { useDispatch, useSelector } from "react-redux";
import { getDailyApplyStats } from "src/store/slices/dailyApplySlice/apis";
import { getStats } from "src/store/slices/dailyApplySlice/selectors";
import Loader from "src/components/Loader";
import { PendingUsersCard } from "./styled";
import { UserOutlined } from "@ant-design/icons";

export const ApplyHistory = () => {
  const dispatch = useDispatch();

  const stats = useSelector(getStats);
  useEffect(() => {
    dispatch(getDailyApplyStats());
  }, []);

  if (!stats) {
    return <Loader />
  }


  return (
    <>
      <h5 style={{ color: '#4154F1', marginBottom: '10px', fontsize: '20px', fontWeight: 'bold' }}>Daily Applies History</h5>
      <h5 style={{ color: '#899BBD', fontSize: '18px' }}>
        Today Total Applies:{" "}
        <span style={{ fontWeight: 'normal' }}>
          {stats?.todayTotalApplies}
        </span>
      </h5>
      <br />
      <Row gutter={8}>
        {stats?.profileCounts?.map((stats) => {
          return (
            <Col xs={24} sm={24} md={12} lg={6}>
              <ApplyCard data={stats} />
            </Col>
          );
        })}
      </Row>
    </>
  );
};

