// CustomInput.js
import React from 'react';
import { Form, Input } from 'antd';

const CustomInput = ({ label, name, placeholder, initialValue, rules, type = 'text', onChange, style, component: Component = Input, disabled, ...rest }) => {
    return (
        <Form.Item
            label={label}
            name={name}
            initialValue={initialValue}
            rules={rules}
        >
            <Component
                type={type}
                placeholder={placeholder}
                onChange={onChange}
                style={style}
                disabled={disabled}
                {...rest}
            />
        </Form.Item>
    );
};

export default CustomInput;
