import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { format, addMonths, subMonths } from 'date-fns';
import styled from 'styled-components';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Button, Flex, Select, Space } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

const localizer = momentLocalizer(moment);

const { Option } = Select;


const CustomToolbar = ({ label, onNavigate, onView }) => {
  const goToToday = () => {
    onNavigate('TODAY');
  };

  const goToNext = () => {
    onNavigate('NEXT');
  };

  const goToPrev = () => {
    onNavigate('PREV');
  };


  const handleViewChange = (view) => {
    onView(view);
  };

  return (
    <Flex className='mb-3' style={{ justifyContent: 'space-between' }}>
      <Space wrap>
        <Button size='large' onClick={goToToday}>Today</Button>
        <Button style={{ border: 'none' }} shape="circle" icon={<LeftOutlined />} onClick={goToPrev} />
        <Button style={{ border: 'none' }} shape="circle" icon={<RightOutlined />} onClick={goToNext} />

        <h5>{label}</h5>
      </Space>

      <Space>
        <Select size='large' defaultValue="work_week" onChange={handleViewChange} style={{ minWidth: '120px' }}>
          <Option value="day">Day</Option>
          <Option value="week">Week</Option>
          <Option value="work_week">Work Week</Option>
          <Option value="month">Month</Option>
          <Option value="agenda">Agenda</Option>
        </Select>
      </Space>
    </Flex>
  );
};

export default CustomToolbar