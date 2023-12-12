import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Select } from 'antd';
import { getAllUsersApi } from 'src/store/slices/userSlice/apis';
import { getAllUsers } from 'src/store/slices/userSlice/selectors';

const { Option } = Select;

const UserDropdown = ({ placeholder, form, value, onChange, name, label }) => {
    const dispatch = useDispatch();
    const allUsers = useSelector(getAllUsers);
    const [selectedUserId, setSelectedUserId] = useState(value || null);

    useEffect(() => {
        if (!allUsers || allUsers.length === 0) {
            dispatch(getAllUsersApi());
        }
    }, [dispatch, allUsers]);

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
            rules={[{
                required: true, message: { placeholder }
            }]}
        >
            <Select
                style={{ width: '100%' }}
                placeholder={placeholder}
                onChange={handleUserChange}
                value={selectedUserId}
            >
                {allUsers && allUsers?.map(user => (
                    <Option key={user?._id} value={user?._id}>
                        {`${user?.first_name} ${user?.last_name}`}
                    </Option>
                ))}
            </Select>
        </Form.Item >
    );
};

export default UserDropdown;