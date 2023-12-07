import { Flex, } from 'antd'
import React, { useEffect } from 'react'
import PolicySidebar from './PolicySidebar'
import PolicyContent from './PolicyContent'
import { useDispatch } from 'react-redux'
import { getPolicyApi } from 'src/store/slices/policySlice/apis'

const Policy = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPolicyApi())
    }, [])

    return (
        <Flex>
            <div style={{ flex: 1 }}>
                <PolicySidebar />
            </div>

            <div style={{ flex: 5 }}>
                <PolicyContent />
            </div>
        </Flex>
    )
}
export default Policy