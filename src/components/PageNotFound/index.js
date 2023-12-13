import React from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();
  const goToDashboard = () => {
    navigate('/dashboard/attendance/dashboard');
  };
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={<Button onClick={goToDashboard} type="primary">Back Home</Button>}
    />
  );
};
export default NotFound;

