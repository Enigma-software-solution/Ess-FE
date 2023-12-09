import { Flex, } from 'antd'
import React, { useEffect } from 'react'
import PolicySidebar from './PolicySidebar'
import PolicyContent from './PolicyContent'
import { useDispatch, useSelector } from 'react-redux'
import { getPolicyApi } from 'src/store/slices/policySlice/apis'
import { getLoading } from 'src/store/slices/policySlice/selectors'
import Loader from 'src/components/Loader'

const Policy = () => {
    const dispatch = useDispatch()

    const isLoading = useSelector(getLoading)

    useEffect(() => {
        dispatch(getPolicyApi())
    }, [])


    if (isLoading) return <Loader />

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