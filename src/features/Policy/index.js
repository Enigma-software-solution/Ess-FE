import { Flex } from 'antd'
import React, { useEffect } from 'react'
import PolicySidebar from './PolicySidebar'
import PolicyContent from './PolicyContent'
import { useDispatch, useSelector } from 'react-redux'
import { getPolicyApi } from 'src/store/slices/policySlice/apis'
import { getAllPolicy, getLoading } from 'src/store/slices/policySlice/selectors'
import Loader from 'src/components/Loader'

const Policy = () => {
    const dispatch = useDispatch()

    const policyList = useSelector(getAllPolicy);
    const isLoading = useSelector(getLoading)

    useEffect(() => {
        if (!policyList) {
            dispatch(getPolicyApi())
        }
    }, [])

    if (isLoading) return <Loader />



    return (
        <Flex>
            <div style={{ flex: 1 }}>
                <PolicySidebar policyList={policyList || []} />
            </div>

            <div style={{ flex: 5 }}>
                <PolicyContent policyList={policyList} />
            </div>
        </Flex>
    )
}
export default Policy