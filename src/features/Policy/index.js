import { Button, Flex } from 'antd'
import React, { useState } from 'react'
import PolicySidebar from './PolicySidebar'
import PolicyContent from './PolicyContent'
import { useNavigate } from 'react-router-dom'



const Policy = () => {
    const [selectedPolicy, setsSlectedPolicy] = useState('introduction')

    const navigate = useNavigate()

    const handlePolicyClick = (value) => {
        setsSlectedPolicy(value)
    }

    return (
        <Flex>

            <Button onClick={() => navigate(-1)}>Back</Button>
            <div className='w-25'>
                <PolicySidebar handleClick={handlePolicyClick} />
            </div>

            <div className='w-75'  >
                <PolicyContent selectedPolicy={selectedPolicy} />
            </div>
        </Flex>
    )
}

export default Policy