import React from 'react';
import { Spin } from 'antd';

const Loader = ({ size = 'large' }) => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Spin size={size} tip="Loading..." />
        </div>
    );
};

export default Loader;
