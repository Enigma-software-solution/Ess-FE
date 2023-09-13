import React, { useState, useEffect } from "react";
import { Table, Popconfirm, Button, message, Pagination } from 'antd';
import EditButton from 'src/components/buttons/EditButton';
import DeleteButton from 'src/components/buttons/DeleteButton';
import Header from '../Header';
import { useDispatch, useSelector } from 'react-redux';
import { getdailyAppliesApi, deteleDailyAppliesApi } from 'src/store/slices/dailyApplySlice/apis';
import { getAllDailyApplies, getLoadingStatus } from "src/store/slices/dailyApplySlice/selectors";
import DailyApplyDrawer from "../Drawers/CreateDrawer";
import { setSelectedApply } from "src/store/slices/dailyApplySlice";
import qs from 'qs'

const DailyAppliesTable = () => {
    const dispatch = useDispatch();
    const dailyAppliesData = useSelector(getAllDailyApplies);
    const loadingStatus = useSelector(getLoadingStatus);
    const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);

    const { totalItems, pageSize, totalPages, page } = dailyAppliesData?.paginator ?? {};


    const handleEdit = (record) => {
        dispatch(setSelectedApply(record));
        setIsEditDrawerOpen(true);
    };

    const handleConfirmDelete = (recordToDelete) => {
            dispatch(deteleDailyAppliesApi(recordToDelete._id))
    };

    const columns = [
        {
            key: "name",
            title: "Name",
            dataIndex: "clientName",
        },
        {
            title: "Link",
            dataIndex: "link",
            render: (text) => (<a href={text}>{text}</a>)
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
            title: "User Email",
            dataIndex: ["user", "email"],
        },
        {
            title: "Company Name",
            dataIndex: "companyName",
        },
        {
            key: "action",
            title: "Action",
            dataIndex: "action",
            render: (text, record) => (
                <div className='d-flex gap-1'>
                    <EditButton onClick={() => handleEdit(record)} />
                    <Popconfirm
                        title="Are you sure to delete this task?"
                        onConfirm={()=>handleConfirmDelete(record)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <DeleteButton>
                            Delete
                        </DeleteButton>
                    </Popconfirm>
                </div>
            )
        },
    ];

    useEffect(() => {
        if (!dailyAppliesData.length) {
            dispatch(getdailyAppliesApi());
        }
    }, []);

    const handleDrawer = () => {
        setIsEditDrawerOpen(false);
        dispatch(setSelectedApply(null));
    };

    return (
        <>
            <Header />
            <Table  pagination={false}   dataSource={dailyAppliesData.daily_applies} size="small" columns={columns} loading={loadingStatus === "loading" && true} />
          
          {
            dailyAppliesData?.paginator && dailyAppliesData.daily_applies.length ?
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

          : null

    }

            <DailyApplyDrawer
                isOpen={isEditDrawerOpen}
                handleDrawer={handleDrawer}
            />
        </>
    );
};

export default DailyAppliesTable;
