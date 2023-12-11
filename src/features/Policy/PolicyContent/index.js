import React, { useState } from "react";
import { Wrapper } from "./styled";
import { getSelectedPolicy } from "src/store/slices/policySlice/selectors";
import { useSelector } from "react-redux";
import { Empty, Flex } from "antd";
import { Watermark } from 'antd';
import AddButton from "src/components/buttons/AddButton";
import PolicyModal from "../PolicyModal";
import { getLogedInUser } from "src/store/slices/authSlice/selectors";
import { ROLES } from "src/constant/roles";
import { isEmpty } from "lodash";

const PolicyContent = ({ policyList }) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const selectedPolicy = useSelector(getSelectedPolicy);


    const authUser = useSelector(getLogedInUser)

    const userRole = authUser?.role
    const isAuthForActions = userRole === ROLES.ADMIN || userRole === ROLES.HR

    return (
        <>
            <Flex vertical>
                <Flex justify="end" className="p-3">
                    {
                        isAuthForActions &&
                        <AddButton text='Create new policy' onClick={() => setIsModalOpen(true)} />
                    }
                </Flex>

                {
                    isEmpty(policyList) ?
                        <Flex justify='center' align='center' >
                            <Empty />
                        </Flex>
                        : <div style={{ flex: 1, padding: '0px 40px 50px', }}>
                            <h2>Terms of Services</h2>
                            <h3 style={{ textTransform: 'capitalize', padding: '12px 0px', marginTop: '10px' }}>{selectedPolicy?.title}</h3>

                            <Watermark content="ENIGMA SOFTWARE SOLUTION" offset={[400, 300]} gap={[300, 550]}>
                                <div
                                    dangerouslySetInnerHTML={{ __html: selectedPolicy?.content }}
                                />
                            </Watermark>
                        </div>

                }
            </Flex>

            <PolicyModal open={isModalOpen} handleClose={() => setIsModalOpen(false)} />
        </>
    );
};

export default PolicyContent;
