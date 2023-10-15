import React from 'react';
import { Button, DatePicker } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const ToolbarWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: #f0f2f5;
`;

const CustomToolbar = ({ onNavigate, label }) => {
  const handleTodayClick = () => {
    // Implement your logic to navigate to today's date
    console.log('Navigate to today');
  };

  return (
    <ToolbarWrapper>
      <div>
        <Button icon={<CalendarOutlined />} onClick={handleTodayClick}>
          Today
        </Button>
      </div>
      <div>
        <DatePicker onChange={(date) => console.log(date)} />
      </div>
    </ToolbarWrapper>
  );
};

export default CustomToolbar;
