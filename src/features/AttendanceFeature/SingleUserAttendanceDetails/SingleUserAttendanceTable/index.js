
import React, { useEffect, useState } from 'react';
import { Table, Spin, DatePicker, Tag, Tooltip, Pagination } from 'antd';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { format } from 'date-fns';
import qs from 'qs';
import { getAllAttendanceApi } from 'src/store/slices/attendanceSlice/GetAttendanceSlice/api';
import { CheckAttendanceStatusColor } from 'src/components/Utils/checkAttendanceStatusColor';
import { StyleNotesText } from './styled';
import { capitalize } from 'lodash';
import dayjs from 'dayjs';

const { RangePicker, MonthPicker } = DatePicker;

const StyledPage = styled.div`
  padding: 20px;
  font-family: 'Arial', sans-serif;
`;

const columns = [
    {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
        render: (text, record) => (text ? format(new Date(text), 'dd MMM yyyy') : 'N/A'),
    },
    {
        title: 'Employee Name',
        dataIndex: 'user.first_name',
        render: (text, record) => capitalize(`${record?.user?.first_name} ${record?.user?.last_name}`),
    },
    {
        title: 'Check In Time',
        dataIndex: 'checkInTime',
        key: 'checkInTime',
        render: (text) => (text ? format(new Date(text), 'p') : 'N/A'),
    },
    {
        title: 'Check Out Time',
        dataIndex: 'checkOutTime',
        key: 'checkOutTime',
        render: (text) => (text ? format(new Date(text), 'p') : 'N/A'),
    },
    {
        title: 'Notes',
        dataIndex: 'notes',
        ellipsis: true,
        render: (text, record) => (
            <Tooltip title={capitalize(text)} placement="topLeft" arrowPointAtCenter>
                <StyleNotesText>
                    {capitalize(text)}
                </StyleNotesText>
            </Tooltip>
        ),
    },
    {
        title: "Status",
        dataIndex: "status",
        render: (text) => {
            const tagStyle = {
                width: '60px',
                display: 'inline-block',
                textAlign: 'center',
            };

            return (
                <Tag color={CheckAttendanceStatusColor(text)} style={tagStyle}>
                    {capitalize(text)}
                </Tag>
            );
        },
    },
];
const SingleUserAttendancTable = ({ userId }) => {
  const [reports, setReports] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    month: dayjs(),
    dateRange: [dayjs().subtract(6, 'days'), dayjs()],
  });

  const dispatch = useDispatch();
  const { totalItems, pageSize, page } = reports?.paginator ?? {};

  const getAttendanceReports = async () => {
    const { month, dateRange } = selectedFilters;
  
    const params = {
      userId: userId,
    };
  
    if (month) {
      params.month = format(new Date(month), 'MMM');
    }
  
    if (dateRange && dateRange.length === 2) {
      params.startDate = format(new Date(dateRange[0]), 'yyyy-MM-dd');
      params.endDate = format(new Date(dateRange[1]), 'yyyy-MM-dd');
    }
  
    try {
      setIsLoading(true);
      const res = await dispatch(getAllAttendanceApi(qs.stringify(params, { encode: false }), userId)).unwrap();
      setReports(res?.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const onPaginationChange = async (page, pageSize) => {
    const { month, dateRange } = selectedFilters;
    const params = {
      page: page,
      pageSize: pageSize,
      userId: userId,
    };
  
    if (month) {
      params.month = format(new Date(month), 'MMM');
    }
  
    if (dateRange && dateRange.length === 2) {
      params.startDate = format(new Date(dateRange[0]), 'yyyy-MM-dd');
      params.endDate = format(new Date(dateRange[1]), 'yyyy-MM-dd');
    }
  
    try {
      setIsLoading(true);
      const res = await dispatch(getAllAttendanceApi(qs.stringify(params, { encode: false }), userId)).unwrap();
      setReports(res?.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };
  

  const handleMonthChange = (value) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      month: value,
    }));
  };

  const handleRangePicker = (dates) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      dateRange: dates,
    }));
  };

  useEffect(() => {
    getAttendanceReports();
  }, [selectedFilters, userId]);
  return (
    <StyledPage>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '20px' }}>
          <MonthPicker onChange={handleMonthChange} placeholder="Select month" value={selectedFilters.month} />
          <RangePicker onChange={handleRangePicker} value={selectedFilters.dateRange} />
        </div>
      </div>

      {isLoading ? (
        <Spin size="large" />
      ) : (
        <>
          <Table columns={columns} dataSource={reports?.attendance} pagination={false} />
          {reports?.paginator && reports?.attendance.length ? (
            <Pagination
              style={{ padding: '10px', display: 'flex', justifyContent: 'flex-end' }}
              total={totalItems}
              showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
              defaultPageSize={pageSize}
              defaultCurrent={page}
              onChange={(page, pageSize) => {
                onPaginationChange(page, pageSize);
              }}
              showSizeChanger
              onShowSizeChange={(current, size) => {
                console.log(`Current: ${current}, PageSize: ${size}`);
              }}
            />
          ) : null}
        </>
      )}
    </StyledPage>
  );
};

export default SingleUserAttendancTable;
