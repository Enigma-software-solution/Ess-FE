import { Select } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsersApi } from "src/store/slices/userSlice/apis";
import { getAllUsers } from "src/store/slices/userSlice/selectors";

const { Option } = Select;

const UserList = ({ user }) => {
    const users = useSelector(getAllUsers);
    const dispatch = useDispatch();

    console.log(user, "user");

    useEffect(() => {
        dispatch(getAllUsersApi());
    }, []);

    return (
        <div>
            <Select
                style={{ width: "320px" }}
                placeholder="Assigned to User"
                optionFilterProp="children"
                defaultValue={user ? user._id : undefined}
            >
                {users?.map((user) => (
                    <Option key={user._id} value={user._id}>
                        <div className="d-flex justify-content-between">
                            <span>{user?.first_name + " " + user?.last_name}</span>
                            <span style={{ fontSize: "12px", color: "gray" }}>
                                {user?.email}
                            </span>
                        </div>
                    </Option>
                ))}
            </Select>
        </div>
    );
};

export default UserList;
