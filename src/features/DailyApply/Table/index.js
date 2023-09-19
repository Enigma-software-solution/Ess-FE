import React, { useState, useEffect } from "react";
import { Table, Popconfirm, Button, Pagination } from "antd";
import EditButton from "src/components/buttons/EditButton";
import DeleteButton from "src/components/buttons/DeleteButton";
import Header from "../Header";
import { useDispatch, useSelector } from "react-redux";
import {
    getdailyAppliesApi,
    deteleDailyAppliesApi,
} from "src/store/slices/dailyApplySlice/apis";
import {
    getAllDailyApplies,
    getLoadingStatus,
} from "src/store/slices/dailyApplySlice/selectors";
import CreateDailyApplyDrawer from "../Drawers/CreateDrawer";
import { setSelectedApply } from "src/store/slices/dailyApplySlice";
import qs from "qs";
import DetailsDailyApplyDrawer from "../Drawers/DetailsDrawer";
import { format } from "date-fns";
import { StyledTable } from "./styled";

const CreateDailyAppliesTable = () => {
    const dispatch = useDispatch();
    const dailyAppliesData = useSelector(getAllDailyApplies);
    const loadingStatus = useSelector(getLoadingStatus);
    const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
    const [isDetailsDrawerOpen, setIsDetailsDrawerOpen] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null); // Store the selected record here

    const { totalItems, pageSize, totalPages, page } =
        dailyAppliesData?.paginator ?? {};

    const handleEdit = (record) => {
        dispatch(setSelectedApply(record));
        setIsEditDrawerOpen(true);
    };

    const handleConfirmDelete = (recordToDelete) => {
        dispatch(deteleDailyAppliesApi(recordToDelete._id));
    };

    const handleRowClick = (record) => {
        setSelectedRecord(record); // Set the selected record
        setIsDetailsDrawerOpen(true);
    };

    const columns = [
        {
            key: "name",
            title: "Client Name",
            sorter: (a, b) => a.clientName.localeCompare(b.clientName),
            dataIndex: "clientName",
        },
        {
            title: "Company Name",
            sorter: (a, b) => a.companyName.localeCompare(b.companyName),
            dataIndex: "companyName",
        },
        {
            title: "Position To Apply",
            dataIndex: "positionToApply",
        },
        {
            title: "Platform",
            dataIndex: "platform",
        },
        {
            title: "Link",
            dataIndex: "link",
            render: (text) => <a href={text} style={{ textDecoration: "none" }}>{text}</a>,
        },
        {
            key: "action",
            title: "Action",
            dataIndex: "action",
            render: (text, record) => (
                <div className="d-flex gap-1">
                    <EditButton onClick={() => handleEdit(record)} />
                    <Popconfirm
                        title="Are you sure to delete this task?"
                        onConfirm={() => handleConfirmDelete(record)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <DeleteButton>Delete</DeleteButton>
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

    return (
        <>
            <Header />
            <StyledTable
                onRow={(record) => ({
                    onClick: () => handleRowClick(record),
                })}
                pagination={false}
                dataSource={dailyAppliesData.daily_applies}
                size="small"
                columns={columns}
                loading={loadingStatus === "loading" && true}
            />
            {dailyAppliesData?.paginator && dailyAppliesData.daily_applies.length ? (
                <Pagination
                    total={totalItems}
                    showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                    defaultPageSize={pageSize}
                    defaultCurrent={page}
                    onChange={(page, pageSize) => {
                        console.log(`Page: ${page}, PageSize: ${pageSize}`);
                        // Call your API here with the new page and page size
                        const queryStringResult = qs.stringify({ page, pageSize });
                        dispatch(getdailyAppliesApi(queryStringResult));
                    }}
                    onShowSizeChange={(current, size) => {
                        // Handle page size change event here
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
