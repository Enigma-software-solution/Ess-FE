import { Flex } from 'antd'
import React, { useState } from 'react'
import PolicySidebar from './PolicySidebar'
import PolicyContent from './PolicyContent'




const Policy = () => {
    const [selectedPolicy, setsSlectedPolicy] = useState('introduction')
    const handlePolicyClick = (value) => {
        setsSlectedPolicy(value)
    }
    return (
        <Flex>
            <div style={{ flex: 1 }}>
                <PolicySidebar handleClick={handlePolicyClick} />

            </div>

            <div style={{ flex: 5 }}>
                <PolicyContent selectedPolicy={selectedPolicy} />

            </div>
        </Flex>
    )
}
export default Policy