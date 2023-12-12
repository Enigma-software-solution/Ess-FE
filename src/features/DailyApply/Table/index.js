import React, { useState, useEffect } from "react";
import { Popconfirm, Pagination } from "antd";
import EditButton from "src/components/buttons/EditButton";
import DeleteButton from "src/components/buttons/DeleteButton";
import Header from "../Header";
import { useDispatch, useSelector } from "react-redux";
import { getdailyAppliesApi, deteleDailyAppliesApi } from "src/store/slices/dailyApplySlice/apis";
import { getAllDailyApplies, isDailyAppliesLoading, } from "src/store/slices/dailyApplySlice/selectors";
import CreateDailyApplyDrawer from "../Drawers/CreateDrawer";
import { setSelectedApply } from "src/store/slices/dailyApplySlice";
import qs from "qs";
import DetailsDailyApplyDrawer from "../Drawers/DetailsDrawer";
import { StyledTable } from "./styled";
import Loader from "src/components/Loader";

const CreateDailyAppliesTable = () => {
    const dispatch = useDispatch();
    const dailyAppliesData = useSelector(getAllDailyApplies);
    const isLoading = useSelector(isDailyAppliesLoading)
    const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
    const [isDetailsDrawerOpen, setIsDetailsDrawerOpen] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [selectPagination, setSelectedPagination] = useState(null)
    const [selectedFilters, setSelectedFilters] = useState(null)

    const { totalItems, pageSize, totalPages, page } = dailyAppliesData?.paginator ?? {};

    const handleEdit = (record, e) => {
        e.stopPropagation();
        dispatch(setSelectedApply(record));
        setIsEditDrawerOpen(true);
    };

    const handleConfirmDelete = (recordToDelete, e) => {
        e.stopPropagation();
        dispatch(deteleDailyAppliesApi(recordToDelete._id));
    };

    const handleRowClick = (record) => {
        setSelectedRecord(record); // Set the selected record
        setIsDetailsDrawerOpen(true);
    };

    const columns = [
        {
            title: "No",
            dataIndex: "serialNo",
            render: (text, record, index) => index + 1,
            width: '40px'
        },
        {
            key: "companyName",
            title: "Company Name",
            sorter: (a, b) => a?.companyName.localeCompare(b?.companyName),
            dataIndex: "companyName",

        },
        {
            title: "Client Job Position ",
            sorter: (a, b) => a?.clientJobPosition.localeCompare(b?.clientJobPosition),
            dataIndex: "clientJobPosition",

        },
        {
            title: "Position To Apply",
            dataIndex: "positionToApply",
            width: '14%'
        },
        {
            title: "Platform",
            dataIndex: "platform",
            width: '10%'

        },
        {
            title: "Link",
            dataIndex: "link",
            ellipsis: true,
            render: (text) => <a href={text} style={{ textDecoration: "none" }}>{text}</a>,
        },
        {
            key: "action",
            title: "Action",
            dataIndex: "action",
            width: '8%',
            render: (text, record) => (
                <div className="d-flex gap-1 justify-content-end">
                    <EditButton onClick={(e) => handleEdit(record, e)} />
                    <Popconfirm
                        title="Are you sure to delete this task?"
                        onConfirm={(e) => handleConfirmDelete(record, e)}
                        onCancel={(e) => e.stopPropagation()}
                        okText="Yes"
                        cancelText="No"
                    >
                        <DeleteButton onClick={(e) => e.stopPropagation()}>Delete</DeleteButton>
                    </Popconfirm>
                </div>
            ),
        },
    ];

    useEffect(() => {
        if (!dailyAppliesData?.daily_applies) {
            const params = {
                date: new Date(),
            };

            const queryStringResult = qs.stringify(params);
            dispatch(getdailyAppliesApi(queryStringResult));
        }
    }, []);

    const handleDrawer = () => {
        setIsEditDrawerOpen(false);
        dispatch(setSelectedApply(null));
    };


    const handleSearch = (params) => {
        const additionalParams = {
            ...params,
            pageSize: selectPagination?.pageSize
        };

        const queryParams = qs.stringify(additionalParams)
        dispatch(getdailyAppliesApi(queryParams));
        setSelectedFilters(params)
    };

    const onPaginationChange = (page, pageSize) => {
        setSelectedPagination({
            page: page,
            pageSize: pageSize
        })

        const params = {
            ...(selectedFilters ? { selectedFilters } : { date: new Date() }),
            page: page,
            pageSize: pageSize
        };

        const queryStringResult = qs.stringify(params);
        dispatch(getdailyAppliesApi(queryStringResult));
    }


    return (
        <>
            <Header pageSize={pageSize} onSearch={handleSearch} />
            <StyledTable
                onRow={(record) => ({
                    onClick: () => handleRowClick(record),
                })}
                pagination={false}
                dataSource={dailyAppliesData.daily_applies}
                size="small"
                columns={columns}
                loading={isLoading}
            />
            {dailyAppliesData?.paginator && dailyAppliesData.daily_applies.length ? (
                <Pagination
                    style={{ padding: '10px', display: 'flex', justifyContent: 'flex-end' }}
                    total={totalItems}
                    showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                    defaultPageSize={pageSize}
                    defaultCurrent={page}

                    onChange={(page, pageSize) => {
                        onPaginationChange(page, pageSize)
                    }}
                    showSizeChanger
                    onShowSizeChange={(current, size) => {
                        console.log(`Current: ${current}, PageSize: ${size}`);
                    }}
                />
            ) : null}
            <CreateDailyApplyDrawer isOpen={isEditDrawerOpen} handleDrawer={handleDrawer} />
            <DetailsDailyApplyDrawer isOpen={isDetailsDrawerOpen} handleDetailsDrawer={() => setIsDetailsDrawerOpen(false)} selectedRecord={selectedRecord} />
        </>
    );
};

export default CreateDailyAppliesTable;
