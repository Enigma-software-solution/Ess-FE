import React from 'react';
import { Card, Row, Col } from 'antd';
import styled from 'styled-components';

// Styled Components
const CardContainer = styled(Card)`
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const InfoContainer = styled.div`
  text-align: center;
`;

const InfoLabel = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 8px;
`;

const InfoValue = styled.div`
  font-size: 24px;
  color: #1890ff;
`;

const DashboardCard = () => {
  // Mock data
  const totalDailyApplies = 150;
  const profileOneApply = 30;
  const profileTwoApply = 45;
  const profileThreeApply = 45;


  return (
    <CardContainer>
      <Row gutter={16}>
       
        <Col span={4}>
          <InfoContainer>
            <InfoLabel>Total Applies Today</InfoLabel>
            <InfoValue>{totalDailyApplies}</InfoValue>
          </InfoContainer>
        </Col>
        <Col span={4}>
          <InfoContainer>
            <InfoLabel>Profile One Apply</InfoLabel>
            <InfoValue>{profileOneApply}</InfoValue>
          </InfoContainer>
        </Col>
        <Col span={4}>
          <InfoContainer>
            <InfoLabel>Profile Two Apply</InfoLabel>
            <InfoValue>{profileTwoApply}</InfoValue>
          </InfoContainer>
        </Col>
        <Col span={4}>
          <InfoContainer>
            <InfoLabel>Profile Three  Apply</InfoLabel>
            <InfoValue>{profileThreeApply}</InfoValue>
          </InfoContainer>
        </Col>
       
      </Row>
    </CardContainer>
  );
};

export default DashboardCard;
