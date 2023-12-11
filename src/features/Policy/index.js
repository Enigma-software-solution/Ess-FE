import { Empty, Flex, } from 'antd'
import React, { useEffect } from 'react'
import PolicySidebar from './PolicySidebar'
import PolicyContent from './PolicyContent'
import { useDispatch, useSelector } from 'react-redux'
import { getPolicyApi } from 'src/store/slices/policySlice/apis'
import { getAllPolicy, getLoading } from 'src/store/slices/policySlice/selectors'
import Loader from 'src/components/Loader'
import { isEmpty } from 'lodash'

const Policy = () => {
    const dispatch = useDispatch()

    const policyList = useSelector(getAllPolicy);


    const isLoading = useSelector(getLoading)

    useEffect(() => {
        dispatch(getPolicyApi())
    }, [])


    if (isLoading) return <Loader />

    if (isEmpty(policyList)) {
        return <Flex justify='center' align='center' style={{ height: '100vh' }}>
            <Empty />
        </Flex>
    }


    return (
        <Flex>
            <div style={{ flex: 1 }}>
                <PolicySidebar policyList={policyList} />
            </div>

            <div style={{ flex: 5 }}>
                <PolicyContent />
            </div>
        </Flex>
    )
}
export default Policy