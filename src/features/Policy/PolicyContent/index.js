import React, { useState } from "react";
import { getSelectedPolicy } from "src/store/slices/policySlice/selectors";
import { useSelector } from "react-redux";
import { Empty, Flex } from "antd";
import { Watermark } from 'antd';
import AddButton from "src/components/buttons/AddButton";
import PolicyModal from "../PolicyModal";
import { getLogedInUser } from "src/store/slices/authSlice/selectors";
import { ROLES } from "src/constant/roles";
import { isEmpty } from "lodash";
import ess from "src/assets/ess.jpeg";
import { FooterWrapper } from "./styled";

const PolicyContent = ({ policyList }) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const selectedPolicy = useSelector(getSelectedPolicy);
    const authUser = useSelector(getLogedInUser)
    const userRole = authUser?.role
    const isAuthForActions = userRole === ROLES?.ADMIN || userRole === ROLES?.HR

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Flex vertical style={{ flex: '1 0 auto' }}>
                <Flex justify="space-between" className="p-3">
                    <img src={ess} alt="ess" draggable={false} width={"70px"} style={{ marginLeft: '25px' }} />

                    {isAuthForActions &&
                        <AddButton text='Create new policy' onClick={() => setIsModalOpen(true)} />
                    }
                </Flex>
                {isEmpty(policyList) ? (
                    <Flex justify='center' align='center' style={{ flex: '1', minHeight: 'calc(100vh - 200px)' }}>
                        <Empty />
                    </Flex>
                ) : (
                    <div style={{ flex: '1', padding: '0px 40px 50px' }}>
                        <h2 style={{ marginTop: '40px' }}>Terms of Services</h2>
                        <h4 style={{ textTransform: 'capitalize', padding: '12px 0px', marginTop: '10px' }}>{selectedPolicy?.title}</h4>

                        <Watermark content="ENIGMA SOFTWARE SOLUTION" offset={[400, 300]} gap={[300, 550]}>
                            <div dangerouslySetInnerHTML={{ __html: selectedPolicy?.content }} />
                        </Watermark>
                    </div>
                )}
            </Flex>
            <PolicyModal open={isModalOpen} handleClose={() => setIsModalOpen(false)} />
            <FooterWrapper>Enigma Software Solution ©2023</FooterWrapper>
        </div>
    );
};

export default PolicyContent;
