import React from 'react';
import { Drawer, Button } from 'antd';

const DetailsDailyApplyDrawer = ({ isOpen, handleDrawer, selectedRecord }) => {
    return (
        <Drawer
            title="Details"
            placement="right"
            closable={false}
            onClose={handleDrawer}
            visible={isOpen}
            width={400}
        >
            {selectedRecord && (
                <div>
                    <p>Name: {selectedRecord.clientName}</p>
                    <p>Link: <a href={selectedRecord.link}>{selectedRecord.link}</a></p>
                    <p>Position To Apply: {selectedRecord.positionToApply}</p>
                    <p>Platform: {selectedRecord.platform}</p>
                    <p>User Email: {selectedRecord.user.email}</p>
                    <p>Company Name: {selectedRecord.companyName}</p>
                    {/* Include other details from the selected record */}
                </div>
            )}
            <Button onClick={handleDrawer} style={{ marginTop: 16 }}>
                Close
            </Button>
        </Drawer>
    );
};

export default DetailsDailyApplyDrawer;
