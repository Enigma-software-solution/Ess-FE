import React, { useEffect, useState } from 'react';
import { Form, Select } from 'antd';

const { Option } = Select;

const UserDropdown = ({ placeholder, form, value, onChange, name, label, options }) => {
    const [selectedUserId, setSelectedUserId] = useState(value || null);

    const handleUserChange = (value) => {
        setSelectedUserId(value);
        if (onChange) {
            onChange(value);
            return
        }
        if (name) {
            form.setFieldsValue({ name: value });
        }
    };

    useEffect(() => {
        setSelectedUserId(value)
    }, [value])


    return (
        <Form.Item
            name={name}
            label={label}
            rules={[
                {
                    required: true,
                    message: placeholder ? placeholder : 'Please select an option'
                }
            ]}
        >
            <Select
                style={{ width: '100%' }}
                placeholder={placeholder}
                onChange={handleUserChange}
                value={selectedUserId}
            >
                {options && options?.map(option => (
                    <Option key={option} >
                        {option}
                    </Option>
                ))}
            </Select>
        </Form.Item >
    );
};

export default UserDropdown;