import React, { useEffect, useState } from 'react';
import { Wrapper } from './styled';
import { useNavigate } from 'react-router-dom';
import { EditOutlined, LeftOutlined } from '@ant-design/icons';
import { getAllPolicy, getSelectedPolicy } from 'src/store/slices/policySlice/selectors'
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedPolicy } from 'src/store/slices/policySlice';
import { Button, Flex } from 'antd';
import PolicyModal from '../PolicyModal';


const PolicySidebar = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch()

    const policyList = useSelector(getAllPolicy)
    const selectedPolicy = useSelector(getSelectedPolicy)

    const handlePolicyClick = (item) => {
        dispatch(setSelectedPolicy(item))
    };

    const handleEditClick = (item) => {
        setIsModalOpen(true);
        dispatch(setSelectedPolicy(item));
    };

    useEffect(() => {
        dispatch(setSelectedPolicy(policyList[0]))
    }, [policyList])


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
                    <Button onClick={() => handleEditClick(item)}> <EditOutlined /></Button>
                </Flex>

            ))
            }
            {isModalOpen && <PolicyModal open={isModalOpen} handleClose={() => setIsModalOpen(false)} selectedPolicy={selectedPolicy} />}

        </Wrapper >
    );
};
export default PolicySidebar;
