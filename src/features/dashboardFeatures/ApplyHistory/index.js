import React, { useEffect } from "react";
import { Col, Row } from "antd";
import ApplyCard from "../Card";
import { useDispatch, useSelector } from "react-redux";
import { getDailyApplyStats } from "src/store/slices/dailyApplySlice/apis";
import { getStats } from "src/store/slices/dailyApplySlice/selectors";

export const ApplyHistory = () => {
  const dispatch = useDispatch();

  const stats = useSelector(getStats);
  useEffect(() => {
    dispatch(getDailyApplyStats());
  }, []);

  if(!stats){
    return <h5>Loading...</h5>
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
              <ApplyCard data={stats}  />
            </Col>
          );
        })}
      </Row>
    </>
  );
};
