import React, { useEffect } from "react";
import { Avatar, Col, Flex, Row,Typography } from "antd";
import ApplyCard from "../Card";
import { useDispatch, useSelector } from "react-redux";
import { getDailyApplyStats } from "src/store/slices/dailyApplySlice/apis";
import { getStats } from "src/store/slices/dailyApplySlice/selectors";
import Loader from "src/components/Loader";
import { PendingUsersCard } from "./styled";

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
      <h5 className="mb-3">Daily Applies History</h5>
      <h5>
        <b>Today Total Applies</b> :
        {stats?.todayTotalApplies}
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
      <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '20px' }}>
      <PendingUsersCard
      title='Pending Approval Users'>
      <Flex gap={10} align="center">
      <Avatar  size={50} />
      <Flex vertical={true} >
        <h5>Username</h5>
        <p>Email</p>
      </Flex>
    </Flex>
    </PendingUsersCard>
      </div>
    </>
  );
};
