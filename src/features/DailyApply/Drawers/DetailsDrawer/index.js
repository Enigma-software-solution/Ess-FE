import React from 'react';
import { Drawer, Button } from 'antd';
import { StyledDetailsDiv } from './styled';

const DetailsDailyApplyDrawer = ({ isOpen, handleDetailsDrawer, selectedRecord }) => {

    return (
        <Drawer
            title="Details Apply"
            placement="right"
            closable={false}
            onClose={handleDetailsDrawer}
            visible={isOpen}
            width={500}
        >
            {selectedRecord && (
                <StyledDetailsDiv>
                    <p><strong>Name:</strong> {selectedRecord.clientName}</p>
                    <p><strong>Link:</strong> <a href={selectedRecord.link} style={{ textDecoration: "none", color: "white" }}>{selectedRecord?.link}</a></p>
                    <p><strong>Position To Apply:</strong> {selectedRecord?.positionToApply}</p>
                    <p><strong>Platform:</strong> {selectedRecord?.platform}</p>
                    <p><strong>Company Name:</strong> {selectedRecord?.companyName}</p>
                    <p><strong>Profile Name:</strong> {selectedRecord?.profile?.name}</p>
                    <p><strong>User Name:</strong> {selectedRecord?.user?.email}</p>
                </StyledDetailsDiv>
            )}
            <Button type="primary" onClick={handleDetailsDrawer} style={{ marginTop: 16 }}>
                Close
            </Button>
        </Drawer>
    );
};
export default DetailsDailyApplyDrawer;
