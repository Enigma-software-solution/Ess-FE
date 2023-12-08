import React, { useEffect, useState } from 'react';
import { PolicyTitleWrapper, Wrapper } from './styled';
import { useNavigate } from 'react-router-dom';
import { EditOutlined, DeleteOutlined, LeftOutlined, MoreOutlined } from '@ant-design/icons';
import { getAllPolicy, getSelectedPolicy } from 'src/store/slices/policySlice/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedPolicy } from 'src/store/slices/policySlice';
import { Flex, Dropdown, Menu, Popconfirm } from 'antd';
import PolicyModal from '../PolicyModal';
import { detelePolicyApi } from 'src/store/slices/policySlice/apis';
import { FiMoreVertical } from "react-icons/fi";
import { ROLES } from 'src/constant/roles';
import { getLogedInUser } from 'src/store/slices/authSlice/selectors';

const PolicySidebar = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);


    const authUser = useSelector(getLogedInUser)

    const userRole = authUser?.role
    const isAuthForActions = userRole === ROLES.ADMIN || userRole === ROLES.HR

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const policyList = useSelector(getAllPolicy);
    const selectedPolicy = useSelector(getSelectedPolicy);

    const handlePolicyClick = (item) => {
        dispatch(setSelectedPolicy(item));
    };

    const handleEditClick = (item) => {
        setIsModalOpen(true);
        dispatch(setSelectedPolicy(item));
    };

    const handleDeleteCancel = (e) => {
        e.stopPropagation();
    };

    const handleDeleteConfirm = (item) => {
        const policyId = item?._id
        dispatch(detelePolicyApi(policyId))
    };

    const handleMenuClick = ({ key }, item) => {
        if (key === 'edit') {
            handleEditClick(item);
        }
    };

    const menu = (item) => (
        <Menu onClick={(e) => handleMenuClick(e, item)}>
            <Menu.Item key="edit">
                <EditOutlined /> Edit
            </Menu.Item>
            <Menu.Item key="delete">
                <Popconfirm
                    title="Are you sure to delete this policy?"
                    onConfirm={() => handleDeleteConfirm(item)}
                    onCancel={handleDeleteCancel}
                    okText="Yes"
                    cancelText="No"
                >
                    <DeleteOutlined /> Delete
                </Popconfirm>
            </Menu.Item>
        </Menu>
    );

    useEffect(() => {
        dispatch(setSelectedPolicy(policyList[0]));
    }, [policyList]);

    return (
        <Wrapper >
            <Flex style={{ height: '40px', padding: '30px 20px', }}>
                <LeftOutlined onClick={() => navigate(-1)} style={{ fontSize: '20px' }} />
            </Flex>
            <PolicyTitleWrapper>

                {policyList?.map((item, index) => (
                    <Flex justify='space-between' align='center' key={index} className={` ${selectedPolicy === item ? 'selected' : ''}`}>
                        <p
                            key={index}
                            className={`m-1 ${selectedPolicy === item ? 'selected' : ''}`}
                            onClick={() => handlePolicyClick(item)}
                        >
                            {`${index + 1}. ${item?.title}`}
                        </p>

                        {
                            isAuthForActions && <Dropdown overlay={() => menu(item)} trigger={['click']} >
                                <FiMoreVertical style={{ fontSize: '18px', cursor: 'pointer', color: 'gray' }} />
                            </Dropdown>
                        }

                    </Flex>
                ))}


            </PolicyTitleWrapper>

            {isModalOpen && <PolicyModal open={isModalOpen} handleClose={() => setIsModalOpen(false)} selectedPolicy={selectedPolicy} />}
        </Wrapper>
    );
};

export default PolicySidebar;