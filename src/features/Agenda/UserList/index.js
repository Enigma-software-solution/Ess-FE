import { Select } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsersApi } from 'src/store/slices/userSlice/apis'
import { getAllUsers } from 'src/store/slices/userSlice/selectors'

const { Option } = Select;

const UserList = () => {

    const users = useSelector(getAllUsers)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllUsersApi())
    }, [])
    return (
        <div>
            <Select
                style={{ width: "100%" }}
                placeholder="Select User"
                optionFilterProp="children"
            >
                {users?.map((user) => (
                    <Option key={user._id} value={user._id}>
                        {`${user?.first_name} - ${user?.email} `}
                    </Option>
                ))}
            </Select>
        </div>
    )
}

export default UserList