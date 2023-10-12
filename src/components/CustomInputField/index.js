import React from 'react';
import { Input, Form } from 'antd';



const CustomInputField = ({ label, name, rules, placeholder, ...rest }) => {

    return (
        <Form.Item name={name} label={label} rules={rules}>
            <Input placeholder={placeholder} {...rest} />
        </Form.Item>
    );
};

export default CustomInputField;
