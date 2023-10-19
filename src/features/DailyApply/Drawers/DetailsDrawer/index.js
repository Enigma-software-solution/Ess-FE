import React from 'react';
import { Drawer, Card, Table } from 'antd';
import { EventLabel, EventValue, StyledDetailsDiv } from './styled';
import { format } from 'date-fns';

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
        { key: '1', property: 'Client Job Position', value: selectedRecord?.clientJobPosition },
        { key: '2', property: 'Company Name Name', value: selectedRecord?.companyName },
        { key: '3', property: 'Platform', value: selectedRecord?.platform },
        { key: '4', property: 'Position To Apply', value: selectedRecord?.positionToApply },
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
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                            borderRadius: '8px',
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
                <div className="w-100 d-flex flex-column align-items-end" style={{ marginTop: '20px' }}>
                    <div>
                        <EventLabel>Date:</EventLabel>
                        <EventValue style={{ marginLeft: '10px' }}>
                            {format(new Date(selectedRecord?.createdAt), 'dd-MM-yyyy')}
                        </EventValue>
                    </div>
                    <div>
                        <EventLabel>Profile:</EventLabel>
                        <EventValue style={{ marginLeft: '10px' }}>{selectedRecord?.profile?.name}</EventValue>
                    </div>
                    <div>
                        <EventLabel>Created by:</EventLabel>
                        <EventValue style={{ marginLeft: '10px' }}>
                            {selectedRecord?.createdBy?.first_name} {selectedRecord?.createdBy?.last_name}
                        </EventValue>
                    </div>
                </div>
            )}
        </Drawer>
    );
};

export default DetailsDailyApplyDrawer;
