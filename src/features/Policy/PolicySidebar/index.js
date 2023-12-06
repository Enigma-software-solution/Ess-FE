import React, { useState } from 'react';
import { Wrapper } from './styled';
import { useNavigate } from 'react-router-dom';
import { LeftOutlined } from '@ant-design/icons';

const PolicySidebar = ({ handleClick }) => {
    const navigate = useNavigate();
    const [selectedItem, setSelectedItem] = useState(null);
    const list = [
        'Introduction',
        'Accountability Provision',
        'Liability Provision',
        'Privacy Policies',
        'Right to Termination',];
    const handleItemClick = (item) => {
        handleClick(item);
        setSelectedItem(item);
    };
    return (
        <Wrapper vertical >
            <LeftOutlined style={{ position: 'absolute', top: '20px', left: '20px', fontSize: '20px' }} onClick={() => navigate(-1)} />

            {list?.map((item, index) => (
                <h5
                    key={index}
                    className={`m-1 ${selectedItem === item ? 'selected' : ''}`}
                    onClick={() => handleItemClick(item)}
                >
                    {`${index + 1}. ${item}`}
                </h5>
            ))}
        </Wrapper>
    );
};
export default PolicySidebar;
