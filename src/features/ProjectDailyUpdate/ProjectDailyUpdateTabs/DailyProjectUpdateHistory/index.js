import { Button, DatePicker, Flex, Select, Space, Spin, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDailyProjectUpdateApi } from 'src/store/slices/projectDailyUpdates/apis';
import { getAllProjectDailyUpdates } from 'src/store/slices/projectDailyUpdates/selectors';
import format from 'date-fns/format';
import qs from 'qs';
import Users from './../../../Users/index';
import { getAllUsersApi } from 'src/store/slices/userSlice/apis';
import { getAllUsers } from 'src/store/slices/userSlice/selectors';
import Loader from 'src/components/Loader';
import { getAllClientsSelector } from 'src/store/slices/clientSlice/selectors';
import { getAllClientsApi } from 'src/store/slices/clientSlice/apis';

const { Option } = Select;
const { RangePicker } = DatePicker;

const UpdateProjectTable = () => {

    const dispatch = useDispatch()
    const allProjects = useSelector(getAllClientsSelector)
    console.log(allProjects, "selector")
    const allUsers = useSelector(getAllUsers)

    const [isLoading, setIsLoading] = useState(false);
    const [updateHistory, setUpdateHistory] = useState(null);

    const [selectedFilters, setSelectedFilters] = useState({
        clientName: null,
        projectManager: null,
        user: null,
        dateRange: [],
    })

    useEffect(() => {
        dispatch(getAllUsersApi())
        dispatch(getAllClientsApi())
    }, [])

    const columns = [
        {
            title: 'Project Name',
            dataIndex: 'project',
            key: 'Project',
            render: (text, record) => record?.project?.clientName || 'No client name',
        },
        {
            title: 'Project Manager',
            dataIndex: 'Project Manager',
            key: 'Project Manager',
            render: (text, record) => {
                const projectManager = record.project?.projectManager;
                if (projectManager && projectManager?.first_name && projectManager?.last_name) {
                    return `${projectManager?.first_name} ${projectManager?.last_name}`;
                } else {
                    return 'No project manager';
                }
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
                const formattedDate = format(new Date(record?.date), 'MM/dd/yyyy');
                return formattedDate;
            },
        },
    ];



    const getUpdateHistory = async (filters) => {
        const params = {};

        if (filters?.projectManager !== null) {
            params.projectManager = filters?.projectManager;
        }

        if (filters?.user !== null) {
            params.user = filters?.user;
        }

        if (filters?.clientName !== null) {
            params.project = filters?.clientName;
        }

        if (filters?.dateRange.length > 0) {
            params.startDate = new Date(filters?.dateRange[0]);
            params.endDate = new Date(filters?.dateRange[1]);
        }

        const queryString = qs.stringify(params);
        try {
            setIsLoading(true);
            const res = await dispatch(getDailyProjectUpdateApi(queryString)).unwrap();
            setUpdateHistory(res?.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleClientChange = (value) => {
        setSelectedFilters(prevFilters => ({
            ...prevFilters,
            clientName: value
        }));
    };

    // const handleProjectManager = (value) => {
    //     setSelectedFilters(prevFilters => ({
    //         ...prevFilters,
    //         projectManager: value
    //     }));
    // };

    const handleUserChange = (value) => {
        setSelectedFilters(prevFilters => ({
            ...prevFilters,
            user: value
        }));
    };

    const handleRangePicker = (dates) => {
        if (dates && dates.length === 2) {
            setSelectedFilters(prevFilters => ({
                ...prevFilters,
                dateRange: dates
            }));
        }
    };

    const handleSubmit = () => {
        getUpdateHistory(selectedFilters);
        setSelectedFilters({
            clientName: null,
            projectManager: null,
            user: null,
            dateRange: [],
        })
    };

    const handleReset = () => {
        setSelectedFilters({
            clientName: null,
            projectManager: null,
            user: null,
            dateRange: [],
        })
        getUpdateHistory();
    };

    useEffect(() => {
        dispatch(getDailyProjectUpdateApi());
        getUpdateHistory(selectedFilters);
    }, []);

    return (
        <>
            <Flex justify="space-between" align="center" className="mb-2">
                <Space size={6}>
                    <Select
                        placeholder="Project Name"
                        onChange={handleClientChange}
                        style={{ minWidth: '120px', width: "200px" }}
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
                        style={{ minWidth: '120px', width: "200px" }}
                        value={selectedFilters?.user}
                    >
                        {allUsers?.map(user => (
                            <Option key={user._id} value={user._id}>
                                {`${user?.first_name} `}
                            </Option>
                        ))}
                    </Select>

                    <RangePicker onChange={handleRangePicker} value={selectedFilters.dateRange} />
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
                {isLoading ? (
                    <Loader />
                ) : (
                    <Table
                        className='mt-4 px-5'
                        dataSource={updateHistory?.dailyUpdates}
                        loading={isLoading}
                        columns={columns}


                    />
                )}
            </div>
        </>
    )
}

export default UpdateProjectTable