import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Select } from 'antd';
import { getAllUsersApi } from 'src/store/slices/userSlice/apis';
import { getAllUsers } from 'src/store/slices/userSlice/selectors';

const { Option } = Select;

const UserDropdown = ({ placeholder, form }) => {
    const dispatch = useDispatch();
    const allUsers = useSelector(getAllUsers);
    const [selectedUserId, setSelectedUserId] = useState(null);

    useEffect(() => {
        if (!allUsers || allUsers.length === 0) {
            dispatch(getAllUsersApi());
        }
    }, [dispatch, allUsers]);

    return (
        <div>
            <Select
                style={{ width: '100%' }}
                placeholder={placeholder}
                onChange={(value) => form.setFieldsValue({ projectManager: value })}
            >
                {allUsers && allUsers.map(user => (
                    <Option key={user?._id} value={user?._id}>
                        {`${user?.first_name} ${user?.last_name}`}
                    </Option>
                ))}
            </Select>
        </div>
    );
};

export default UserDropdown;
