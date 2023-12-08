import React, { useState } from "react";
import { Wrapper } from "./styled";
import { getSelectedPolicy } from "src/store/slices/policySlice/selectors";
import { useSelector } from "react-redux";
import { Flex } from "antd";
import { Watermark } from 'antd';
import AddButton from "src/components/buttons/AddButton";
import PolicyModal from "../PolicyModal";

const PolicyContent = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const selectedPolicy = useSelector(getSelectedPolicy);

    return (
        <>
            <Wrapper>
                <Flex justify="end" className="p-3">
                    <AddButton text='Create new policy' onClick={() => setIsModalOpen(true)} />
                </Flex>
                <div className="p-5" style={{ flex: 1 }}>
                    <Watermark content="ENIGMA SOFTWARE SOLUTION" >
                        <h2>{selectedPolicy?.title}</h2>
                        <div
                            dangerouslySetInnerHTML={{ __html: selectedPolicy?.content }}
                        />

                        <div style={{ height: 500 }} />
                    </Watermark>
                </div>
            </Wrapper>

            <PolicyModal open={isModalOpen} handleClose={() => setIsModalOpen(false)} />
        </>
    );
};

export default PolicyContent;
