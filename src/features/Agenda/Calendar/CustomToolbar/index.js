import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { format, addMonths, subMonths } from 'date-fns';
import styled from 'styled-components';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

// Styled components for the custom toolbar
const ToolbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const Button = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 8px 12px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const CustomToolbar = ({ label, onNavigate }) => {
  const goToToday = () => {
    onNavigate('TODAY');
  };

  const goToNext = () => {
    onNavigate('NEXT');
  };

  const goToPrev = () => {
    onNavigate('PREV');
  };

  return (
    <ToolbarContainer>
      <Button onClick={goToPrev}>Back</Button>
      <div>{label}</div>
      <Button onClick={goToNext}>Next</Button>
      <Button onClick={goToToday}>Today</Button>
    </ToolbarContainer>
  );
};

export default CustomToolbar