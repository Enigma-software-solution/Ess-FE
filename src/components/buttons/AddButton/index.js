"use client"
import React from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';


const AddButton= ({ onClick, text, ...rest }) => {
    return (
        <Button type="primary" icon={<PlusOutlined />} size="large" onClick={onClick} {...rest}>
            {text}
        </Button>
    );
};

export default AddButton;