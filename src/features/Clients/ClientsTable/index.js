import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteClientApi, getAllClientsApi, updateClientApi } from "src/store/slices/clientSlice/apis";
import { getAllClientsSelector, isClientLoading } from "src/store/slices/clientSlice/selectors";
import { Popconfirm, Table } from "antd";
import Header from "../Header";
import EditButton from "src/components/buttons/EditButton";
import DeleteButton from "src/components/buttons/DeleteButton";
import Loader from "src/components/Loader";
import { setSelectedClient } from "src/store/slices/clientSlice";
import { StyledBadge } from "./styled";
import { toast } from 'react-toastify';
import dayjs from 'dayjs';


const ClientTable = () => {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const isLoading = useSelector(isClientLoading);
    const clients = useSelector(getAllClientsSelector);
    const handleChangeStatus = (e, record) => {
        e.stopPropagation();
        if (record._id) {
            const data = {
                id: record._id,
                data: {
                    ...record,
                    active: record?.active === "active" ? 'inactive' : 'active'
                }

            };
            dispatch(updateClientApi(data));
        } else {
            console.error("Client record does not have a valid _id");
        }
    };
    useEffect(() => {
        try {
            dispatch(getAllClientsApi());
        } catch (err) {
            console.log(err);
        }
    }, []);
    const handleConfirmDelete = (recordToDelete, e) => {
        e.stopPropagation();
        dispatch(deleteClientApi(recordToDelete._id));
    };

    const handleDisabledDeleteClick = (e) => {
        e.stopPropagation();
        toast.warn('Active clients cannot be deleted.');
    };
    const handleEdit = (record, e) => {
        e.stopPropagation();
        dispatch(setSelectedClient(record));
        setIsOpen(true);
    };

    const columns = [

        {
            title: "Client Name",
            dataIndex: "clientName",
            key: "clientName",
            render: (text, record) => ((record?.apply?.clientName || record?.clientName || '').split(' ').map((name, index) => index === 0 || index === 1 ? name.charAt(0).toUpperCase() + name.slice(1).toLowerCase() : name).join(' '))
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Status",
            dataIndex: "active",
            render: (text, record) => {
                const isActive = text === "active";


                return (
                    <div className="d-flex gap-1">
                        <Popconfirm
                            title={`Are you sure to ${isActive ? "deactivate" : "activate"} this Client?`}
                            onConfirm={(e) => handleChangeStatus(e, record)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <StyledBadge onClick={(e) => e.stopPropagation()} status={text}>
                                {text}
                            </StyledBadge>
                        </Popconfirm>
                    </div >
                );
            }
        },
        {
            title: "Project Manager",
            dataIndex: "projectManager?.first_name",
            render: (text, record) => record?.projectManager?.first_name,

        },
        {
            title: "Created On",
            dataIndex: "createdOn",
            key: "createdOn",
            width: 150,
            render: (text, record) => dayjs(record?.createdOn).format('YYYY-MM-DD'),
        },
        {
            title: "Client Time Zone",
            dataIndex: "clientTimeZone",
            render: (text, record) => record?.clientTimeZone,

        },
        {
            title: "Developer",
            dataIndex: "developer?.first_name",
            render: (text, record) => record?.developer?.first_name,

        },
        {
            title: "Contract Type",
            dataIndex: "contractType",
            render: (text, record) => record?.contractType,

        },
        {
            title: "Client Payment Cycle",
            dataIndex: "clientPaymentCycle",
            render: (text, record) => record?.clientPaymentCycle,
        },
        {
            title: "Profile",
            dataIndex: "profile?.name",
            render: (text, record) => record?.profile?.name,

        },

        {
            key: "action",
            title: "Action",
            dataIndex: "action",
            render: (text, record) => {
                const isClientActive = record.active === 'active';

                return (
                    <div className="d-flex gap-1">
                        <EditButton onClick={(e) => handleEdit(record, e)} />
                        {isClientActive ? (
                            <DeleteButton disabled onClick={(e) => handleDisabledDeleteClick(e)}>
                                Delete (Active)
                            </DeleteButton>
                        ) : (
                            <Popconfirm
                                title="Are you sure to delete this client?"
                                onConfirm={(e) => handleConfirmDelete(record, e)}
                                onCancel={(e) => e.stopPropagation()}
                                okText="Yes"
                                cancelText="No"
                                disabled={isClientActive}
                            >
                                <DeleteButton onClick={(e) => e.stopPropagation()}>
                                    Delete
                                </DeleteButton>
                            </Popconfirm>
                        )}
                    </div>
                );
            },
        },
    ];

    if (isLoading) {
        return <Loader />
    }

    return (
        <div>
            <Header isOpen={isOpen} setIsOpen={setIsOpen} />
            <Table dataSource={clients} columns={columns} />
        </div>
    );
};

export default ClientTable;
