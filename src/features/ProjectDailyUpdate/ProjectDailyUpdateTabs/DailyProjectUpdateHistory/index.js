import { Button, DatePicker, Flex, Pagination, Select, Space, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDailyProjectUpdateApi } from 'src/store/slices/projectDailyUpdates/apis';
import format from 'date-fns/format';
import qs from 'qs';
import { getAllUsersApi } from 'src/store/slices/userSlice/apis';
import { getAllUsers } from 'src/store/slices/userSlice/selectors';
import Loader from 'src/components/Loader';
import { getAllClientsSelector } from 'src/store/slices/clientSlice/selectors';
import { getAllClientsApi } from 'src/store/slices/clientSlice/apis';
import { getLogedInUser } from 'src/store/slices/authSlice/selectors';

const { Option } = Select;
const { RangePicker } = DatePicker;

const UpdateProjectTable = () => {
  const dispatch = useDispatch();
  const allProjects = useSelector(getAllClientsSelector);
  const allUsers = useSelector(getAllUsers);
  const loggedInUser = useSelector(getLogedInUser);
  const [isLoading, setIsLoading] = useState(false);
  const [updateHistory, setUpdateHistory] = useState(null);
  const { totalItems, pageSize, totalPages, page } = updateHistory?.paginator ?? {};
  const initialFilters = {
    admin: {
      clientName: null,
      projectManager: null,
      user: null,
      dateRange: [],
    },
    project_manager: {
      clientName: null,
      projectManager: loggedInUser?.id,
      user: null,
      dateRange: [],
    },
    defaultUser: {
      clientName: null,
      projectManager: null,
      user: loggedInUser?.id,
      dateRange: [],
    },
  };

  const [selectedFilters, setSelectedFilters] = useState(
    initialFilters[loggedInUser?.role]
  );

  useEffect(() => {
    dispatch(getAllUsersApi());
    dispatch(getAllClientsApi());
  }, [dispatch]);

  const columns = [
    {
      title: 'Project Name',
      dataIndex: 'project',
      key: 'Project',
      render: (text, record) =>
        record?.project?.clientName || 'No client name',
    },
    {
      title: 'Project Manager',
      dataIndex: 'Project Manager',
      key: 'Project Manager',
      render: (text, record) => {
        const projectManager = record.project?.projectManager;
        return (
          projectManager &&
            projectManager?.first_name &&
            projectManager?.last_name
            ? `${projectManager?.first_name} ${projectManager?.last_name}`
            : 'No project manager'
        );
      },
    },
    {
      title: 'Update',
      dataIndex: 'content',
      key: 'Update',
      render: (text, record) => (
        <span dangerouslySetInnerHTML={{ __html: record?.content }} />
      ),
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'Date',
      render: (text, record) => {
        const formattedDate = format(
          new Date(record?.date),
          'MM/dd/yyyy'
        );
        return formattedDate;
      },
    },
  ];

  const onPaginationChange = async (page, pageSize) => {


    const params = {
      page: page,
      pageSize: pageSize,
    };

    const queryStringResult = qs.stringify(params);
    try {
      setIsLoading(true);
      const res = await dispatch(
        getDailyProjectUpdateApi(queryStringResult)
      ).unwrap();
      setUpdateHistory(res?.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };


  const getUpdateHistory = async (filters) => {
    const params = {};

    switch (loggedInUser?.role) {
      case 'admin':
        break;

      case 'project_manager':
        params.projectManager = loggedInUser?.id;
        break;

      default:
        params.user = loggedInUser?.id;
        break;
    }

    if (filters?.clientName !== null) {
      params.project = filters?.clientName;
    }

    if (filters?.user !== undefined) {
      params.user = filters?.user;
    }

    if (filters?.dateRange.length > 0) {
      params.startDate = new Date(filters?.dateRange[0]);
      params.endDate = new Date(filters?.dateRange[1]);
    }


    const queryString = qs.stringify(params);
    try {
      setIsLoading(true);
      const res = await dispatch(
        getDailyProjectUpdateApi(queryString)
      ).unwrap();
      setUpdateHistory(res?.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClientChange = (value) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      clientName: value,
    }));
  };

  const handleUserChange = (value) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      user: value,
    }));
  };

  const handleRangePicker = (dates) => {
    if (dates && dates.length === 2) {
      setSelectedFilters((prevFilters) => ({
        ...prevFilters,
        dateRange: dates,
      }));
    }
  };

  const handleSubmit = () => {
    getUpdateHistory(selectedFilters);
  };

  const handleReset = () => {
    setSelectedFilters(initialFilters[loggedInUser?.role]);
    getUpdateHistory(initialFilters[loggedInUser?.role]);
  };

  useEffect(() => {
    getUpdateHistory(selectedFilters);
  }, []);

  return (
    <>
      <Flex justify="space-between" align="center" className="mb-2">
        <Space size={6}>
          {loggedInUser.role === 'admin' && (
            <>
              <Select
                placeholder="Project Name"
                onChange={handleClientChange}
                style={{ minWidth: '120px', width: '200px' }}
                value={selectedFilters?.clientName}
              >
                {allProjects?.map((project, index) => (
                  <Option key={index} value={project?._id}>
                    {`${project?.clientName} `}
                  </Option>
                ))}
              </Select>

              <Select
                placeholder="User"
                onChange={handleUserChange}
                style={{ minWidth: '120px', width: '200px' }}
                value={selectedFilters?.user}
              >
                {allUsers?.map((user) => (
                  <Option key={user._id} value={user._id}>
                    {`${user?.first_name} `}
                  </Option>
                ))}
              </Select>
            </>
          )}

          <RangePicker
            onChange={handleRangePicker}
            value={selectedFilters?.dateRange}
          />
        </Space>
        <Space size={6}>
          <Button type="primary" onClick={handleSubmit}>
            Submit
          </Button>
          <Button type="primary" danger onClick={handleReset}>
            Reset
          </Button>
        </Space>
      </Flex>
      <div>

        <div>
          <Table
            className="mt-4 px-5"
            dataSource={updateHistory?.dailyUpdates}
            loading={isLoading}
            columns={columns}
            pagination={false}
          />
          {updateHistory?.paginator && updateHistory.dailyUpdates.length ? (
            <Pagination
              style={{ padding: '10px', display: 'flex', justifyContent: 'flex-end' }}
              total={totalItems}
              showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
              defaultPageSize={pageSize}
              defaultCurrent={page}
              onChange={onPaginationChange} 
              showSizeChanger
            />

          ) : null}
        </div>

      </div>
    </>
  );
};

export default UpdateProjectTable;
