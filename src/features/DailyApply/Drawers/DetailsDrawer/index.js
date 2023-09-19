import React from 'react';
import { Drawer, Button, Card } from 'antd';
import { EventLabel, EventValue, StyledDetailsDiv } from './styled';
import { format } from "date-fns";


const DetailsDailyApplyDrawer = ({ isOpen, handleDetailsDrawer, selectedRecord }) => {

    console.log(selectedRecord, "selected")

    return (
        <Drawer
            title="Details Apply"
            placement="right"
            closable={true}
            onClose={handleDetailsDrawer}
            visible={isOpen}
            width={500}
        >
            {selectedRecord && (
                <StyledDetailsDiv>
                    <Card className="w-100" title="Apply Information">
                        <p><strong>Company Name:</strong> {selectedRecord?.companyName}</p>
                        <p><strong>Client Name:</strong> {selectedRecord?.clientName}</p>
                        <p><strong>Platform:</strong> {selectedRecord?.platform}</p>
                        <p><strong>Position To Apply:</strong> {selectedRecord?.positionToApply}</p>
                        <p><strong>Link:</strong> <a href={selectedRecord?.link} style={{ textDecoration: "none" }}>{selectedRecord?.link}</a></p>
                        <p><strong>Profile Name:</strong> {selectedRecord?.profile?.name}</p>
                    </Card>
                </StyledDetailsDiv>
            )}

            {selectedRecord && selectedRecord.createdAt && (
                <div className="w-100 d-flex flex-column align-items-end">
                    <div>
                        <EventLabel>Date:</EventLabel>
                        <EventValue> {format(new Date(selectedRecord?.createdAt), "dd-MM-yyyy")}</EventValue>
                    </div>
                    <div>
                        <EventLabel>Profile:</EventLabel>
                        <EventValue>{selectedRecord?.profile?.name}</EventValue>
                    </div>
                    <div>
                        <EventLabel>User:</EventLabel>
                        <EventValue>
                            {selectedRecord?.user?.first_name} {selectedRecord?.user?.last_name}
                        </EventValue>
                    </div>
                </div>
            )}

        </Drawer>
    );
};
export default DetailsDailyApplyDrawer;
