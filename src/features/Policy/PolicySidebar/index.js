import React, { useEffect } from 'react';
import { Wrapper } from './styled';
import { useNavigate } from 'react-router-dom';
import { LeftOutlined } from '@ant-design/icons';
import { getAllPolicy, getSelectedPolicy } from 'src/store/slices/policySlice/selectors'
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedPolicy } from 'src/store/slices/policySlice';


const PolicySidebar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const policyList = useSelector(getAllPolicy)
    const selectedPolicy = useSelector(getSelectedPolicy)

    const handlePolicyClick = (item) => {
        dispatch(setSelectedPolicy(item))
    };

    useEffect(() => {
        dispatch(setSelectedPolicy(policyList[0]))
    }, [policyList])


    return (
        <Wrapper vertical >
            <LeftOutlined style={{ position: 'absolute', top: '20px', left: '20px', fontSize: '20px' }} onClick={() => navigate(-1)} />

            {policyList?.map((item, index) => (
                <h5
                    key={index}
                    className={`m-1 ${selectedPolicy === item ? 'selected' : ''}`}
                    onClick={() => handlePolicyClick(item)}
                >
                    {`${index + 1}. ${item?.title}`}
                </h5>
            ))}
        </Wrapper>
    );
};
export default PolicySidebar;
