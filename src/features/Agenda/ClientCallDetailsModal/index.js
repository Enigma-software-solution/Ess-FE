import React from 'react';
import { Flex, Modal, Space } from 'antd';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { getSelectedEvent } from 'src/store/slices/agendaSlice/selector';
import { format } from 'date-fns';

const StyledFlex = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 16px;
`;

const ClientCallDetailsModal = ({ isOpen, handleClose }) => {
    const dispatch = useDispatch()
    const clientCallDetails = useSelector(getSelectedEvent)



    return (
        <Modal
            title="Client call details"
            open={isOpen}
            onCancel={() => handleClose(false)}
            footer={null}
            style={{ top: 20 }}
        >
            {clientCallDetails === null ?
                <h5>Loading...</h5>
                :
                <Flex vertical>
                    {clientCallDetails?.start && clientCallDetails.end && (
                        <div className="mb-1"  >


                            <div className="d-flex justify-content-end align-items-end flex-column  mb-1">
                                <p>
                                    Date: {format(new Date(clientCallDetails?.start), "dd-MM-yyyy")}
                                </p>
                                <p>
                                    Time: {format(new Date(clientCallDetails?.start), "p")} -{" "}
                                    {format(new Date(clientCallDetails?.end), "p")}
                                </p>
                            </div>
                        </div>
                    )}

                    <p>Assign To: {clientCallDetails?.assignTo?.first_name}</p>
                    <p>Duration: {clientCallDetails?.callDuration}</p>
                    <p>Call Type: {clientCallDetails?.callType}</p>
                </Flex>
            }
        </Modal>
    );
};

export default ClientCallDetailsModal;
