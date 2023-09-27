import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllClientsApi } from "src/store/slices/clientSlice/apis";
import { getAllClientsSelector } from "src/store/slices/clientSlice/selectors";
import { Table } from "antd";

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

    const columns = [
        {
            title: "Client Name",
            dataIndex: "clientName",
            key: "clientName",
        },
        {
            title: "Client Email",
            dataIndex: "clientEmail",
            key: "clientEmail",
        },
        {
            title: "Platform",
            dataIndex: "platform",
            key: "platform",
        },
        {
            title: "Position",
            dataIndex: "position",
            key: "position",
        },
    ];

    return (
        <div>
            <Table dataSource={clients} columns={columns} />
        </div>
    );
};

export default ClientTable;
