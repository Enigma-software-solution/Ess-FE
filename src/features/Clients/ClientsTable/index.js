import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteClientApi, deteleClientApi, getAllClientsApi } from "src/store/slices/clientSlice/apis";
import { getAllClientsSelector } from "src/store/slices/clientSlice/selectors";
import { Popconfirm, Table } from "antd";
import Header from "../Header";
import EditButton from "src/components/buttons/EditButton";
import DeleteButton from "src/components/buttons/DeleteButton";

const ClientTable = () => {
    const dispatch = useDispatch();

    const clients = useSelector(getAllClientsSelector);

    console.log(clients, "clients");

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

    const columns = [
        {
            title: "Client Name",
            dataIndex: "apply.clientName",
            key: "clientName",
            render: (text, record) => record.apply?.clientName,
        },
        {
            title: "Status",
            dataIndex: "active",
        },
        {
            title: "Platform",
            dataIndex: "apply?.platform",
            render: (text, record) => record.apply?.platform,

        },
        {
            title: "Position",
            dataIndex: "apply?.positionToApply",
            render: (text, record) => record.apply?.positionToApply,

        },
        {
            key: "action",
            title: "Action",
            dataIndex: "action",
            render: (text, record) => (
                <div className="d-flex gap-1">
                    <EditButton />
                    <Popconfirm
                        title="Are you sure to delete this client?"
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

    return (
        <div>
            <Header />
            <Table dataSource={clients} columns={columns} />
        </div>
    );
};

export default ClientTable;
