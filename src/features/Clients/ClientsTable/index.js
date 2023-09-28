import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllClientsApi } from "src/store/slices/clientSlice/apis";
import { getAllClientsSelector } from "src/store/slices/clientSlice/selectors";
import { Table } from "antd";
import Header from "../Header";

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
    ];

    return (
        <div>
            <Header />
            <Table dataSource={clients} columns={columns} />
        </div>
    );
};

export default ClientTable;
