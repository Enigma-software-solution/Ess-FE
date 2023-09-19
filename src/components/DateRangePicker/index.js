import React from 'react';
import { DatePicker } from 'antd';
import styled from 'styled-components';

const StyledRangePicker = styled(DatePicker.RangePicker)`
  height: 32px;
  width: 250px; 
`;

const DateRangePicker = ({ onChange }) => {
  return <StyledRangePicker onChange={onChange} />;
};

export default DateRangePicker;
