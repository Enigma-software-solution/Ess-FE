import React from 'react';
import { Drawer, Card, Table } from 'antd';
import { EventLabel, EventValue, StyledDetailsDiv } from './styled';
import { format } from 'date-fns';
import { capitalize } from "lodash";

const DetailsDailyApplyDrawer = ({ isOpen, handleDetailsDrawer, selectedRecord }) => {
    // Define columns and data
    const columns = [
        {
            title: 'Property',
            dataIndex: 'property',
            key: 'property',
            render: (text) => <strong>{text}</strong>,
        },
        {
            title: 'Value',
            dataIndex: 'value',
            key: 'value',
        },
    ];

    const data = [
        { key: '1', property: 'Client Job Position :', value: capitalize(selectedRecord?.clientJobPosition) },
        { key: '2', property: 'Company Name Name :', value: capitalize(selectedRecord?.companyName) },
        {
            key: '3', property: 'Platform :', value: capitalize(selectedRecord?.platform)
        },
        { key: '4', property: 'Position To Apply :', value: capitalize(selectedRecord?.positionToApply).split('_') },
        // Add more rows as needed
    ];


    return (
        <Drawer
            title="Details Apply"
            placement="right"
            closable={true}
            onClose={handleDetailsDrawer}
            open={isOpen}
            width={500}
        >
            {selectedRecord && (
                <StyledDetailsDiv>
                    <Card
                        className="w-100"
                        style={{
                            boxShadow: '4px 2px 20px -7px rgba(0, 0, 0, 0.2)',
                            borderRadius: '8px',
                            margin: '20px 0'
                        }}
                    >
                        <Table
                            columns={columns}
                            dataSource={data}
                            bordered={false}
                            showHeader={false}
                            pagination={false}
                            size="middle"
                        />
                    </Card>
                </StyledDetailsDiv>
            )}

            {selectedRecord && selectedRecord.createdAt && (
                <div className="w-100 d-flex flex-column align-items-end px-4" style={{ marginTop: '20px' }}>
                    <div>
                        <EventLabel>Date:</EventLabel>
                        <EventValue style={{ marginLeft: '10px', textTransform: 'capitalize' }}>
                            {format(new Date(selectedRecord?.createdAt), 'dd-MM-yyyy')}
                        </EventValue>
                    </div>
                    <div>
                        <EventLabel>Profile:</EventLabel>
                        <EventValue style={{ marginLeft: '10px', textTransform: 'capitalize' }}>
                            {selectedRecord?.profile?.name}
                        </EventValue>
                    </div>
                    <div>
                        <EventLabel>Created by:</EventLabel>
                        <EventValue style={{ marginLeft: '10px', textTransform: 'capitalize' }}>
                            {selectedRecord?.createdBy?.first_name} {selectedRecord?.createdBy?.last_name}
                        </EventValue>
                    </div>
                </div>
            )}

        </Drawer>
    );
};

export default DetailsDailyApplyDrawer;
