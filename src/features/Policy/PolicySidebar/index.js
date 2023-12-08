import React, { useEffect, useState } from 'react';
import { Wrapper } from './styled';
import { useNavigate } from 'react-router-dom';
import { EditOutlined, DeleteOutlined, LeftOutlined, MoreOutlined } from '@ant-design/icons';
import { getAllPolicy, getSelectedPolicy } from 'src/store/slices/policySlice/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedPolicy } from 'src/store/slices/policySlice';
import { Button, Flex, Dropdown, Menu } from 'antd';
import PolicyModal from '../PolicyModal';

const PolicySidebar = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

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

    const handleDeleteClick = (item) => {

    };

    const handleMenuClick = ({ key }, item) => {
        if (key === 'edit') {
            handleEditClick(item);
        } else if (key === 'delete') {
            handleDeleteClick(item);
        }
    };

    const menu = (item) => (
        <Menu onClick={(e) => handleMenuClick(e, item)}>
            <Menu.Item key="edit">
                <EditOutlined /> Edit
            </Menu.Item>
            <Menu.Item key="delete">
                <DeleteOutlined /> Delete
            </Menu.Item>
        </Menu>
    );

    useEffect(() => {
        dispatch(setSelectedPolicy(policyList[0]));
    }, [policyList]);

    return (
        <Wrapper style={{ position: 'fixed', display: 'flex', flexDirection: 'column' }}>
            <LeftOutlined style={{ position: 'absolute', top: '20px', left: '20px', fontSize: '20px' }} onClick={() => navigate(-1)} />
            {policyList?.map((item, index) => (
                <Flex justify='space-between' key={index} className={` ${selectedPolicy === item ? 'selected' : ''}`}>
                    <h5
                        key={index}
                        className={`m-1 ${selectedPolicy === item ? 'selected' : ''}`}
                        onClick={() => handlePolicyClick(item)}
                    >
                        {`${index + 1}. ${item?.title}`}
                    </h5>
                    <Dropdown overlay={() => menu(item)} trigger={['click']}>
                        <MoreOutlined style={{ fontSize: '20px', cursor: 'pointer' }} />
                    </Dropdown>
                </Flex>
            ))}
            {isModalOpen && <PolicyModal open={isModalOpen} handleClose={() => setIsModalOpen(false)} selectedPolicy={selectedPolicy} />}
        </Wrapper>
    );
};

export default PolicySidebar;