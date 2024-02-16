import React from 'react';
import { Drawer, Card, Popconfirm } from 'antd';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { getSelectedEvent } from 'src/store/slices/agendaSlice/selector';
import { format } from 'date-fns';
import { DeleteEventsApi } from 'src/store/slices/agendaSlice/apis';
import DeleteButton from 'src/components/buttons/DeleteButton';

const StyledFlex = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 16px;
`;

const ClientCallDetailsDrawer = ({ isOpen, handleClose }) => {
    const dispatch = useDispatch();
    const clientCallDetails = useSelector(getSelectedEvent);
    const selectedEvent = {};

    const handleConfirmDelete = () => {
        try {
            dispatch(DeleteEventsApi(clientCallDetails?._id));
            handleClose();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Drawer
            title="Client call details"
            placement="right"
            closable={true}
            onClose={handleClose}
            visible={isOpen}
            width={"35%"}
            extra={
                <div className="d-flex w-100 gap-1 justify-content-end mb-1">
                    <Popconfirm
                        title="Are you sure to delete this Call?"
                        onConfirm={handleConfirmDelete}
                        okText="Yes"
                        cancelText="No"
                    >
                        <DeleteButton>Delete</DeleteButton>
                    </Popconfirm>
                </div>
            }
        >
            {clientCallDetails === null ?
                <h5>Loading...</h5>
                :

                <StyledFlex>
                    <div className="d-flex justify-content-end align-items-end flex-column  mb-2 " >
                        <strong>
                            Date: {format(new Date(clientCallDetails?.start), "dd-MM-yyyy")}
                        </strong>
                        <strong>
                            Time: {format(new Date(clientCallDetails?.start), "p")} -{" "}
                            {format(new Date(clientCallDetails?.end), "p")}
                        </strong>
                    </div>
                    <Card className="w-100 shadow m-3 mt-5">
                        <table className="table">
                            <tbody>
                                <tr>
                                    <th className="fw-bold">Assign To:</th>
                                    <td style={{ textTransform: 'capitalize' }}>{clientCallDetails?.assignTo?.first_name}</td>
                                </tr>
                                <tr>
                                    <th className="fw-bold">Duration:</th>
                                    <td style={{ textTransform: 'capitalize' }}>{clientCallDetails?.callDuration}</td>
                                </tr>
                                <tr>
                                    <th className="fw-bold">Call Type:</th>
                                    <td style={{ textTransform: 'capitalize' }}>{clientCallDetails?.callType}</td>
                                </tr>
                            </tbody>
                        </table>
                    </Card>
                </StyledFlex>
            }
        </Drawer>
    );
};

export default ClientCallDetailsDrawer;
