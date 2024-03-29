import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, Drawer, Popconfirm, Tag } from "antd";
import { format } from "date-fns";
import {
  checkEventDrawer,
  checkNotesDrawer,
  getAllEvents,
  getSelectedEvent,
} from "src/store/slices/agendaSlice/selector";
import NotesDrawer from "../NotesDrawer";
import { DeleteEventsApi } from "src/store/slices/agendaSlice/apis";
import DeleteButton from "src/components/buttons/DeleteButton";
import EditButton from "src/components/buttons/EditButton";
import {
  closeEventDrawer,
  setSelectedEvent,
  showNotesDrawer,
  showSalesDrawer,
} from "src/store/slices/agendaSlice";
import { toast } from "react-toastify";
import UserList from "../UserList";
import { CheckAgendaLeadsColor } from "src/components/Utils/checkAgendaLeadsColor";
import { CheckAgendaStatusColor } from "src/components/Utils/checkAgendaStatusColor";
import { StyledTag } from "./styled";

const SalesCallDetailsDrawer = () => {
  const dispatch = useDispatch();
  const isEventDrawer = useSelector(checkEventDrawer);
  const isNotesDrawer = useSelector(checkNotesDrawer);
  const selectedEvent = useSelector(getSelectedEvent);
  const event = useSelector(getAllEvents);

  const handleNotesDrawer = () => {
    dispatch(showNotesDrawer());
  };

  const handleConfirmDelete = (record) => {
    try {
      dispatch(DeleteEventsApi(record?._id));
      dispatch(closeEventDrawer());
      toast.success("Record Deleted Successfully");
    } catch (err) {
      console.log(err);
    }
  };

  const onClose = () => {
    dispatch(closeEventDrawer());
    dispatch(setSelectedEvent(null));
  };

  const handleUpdate = () => {
    dispatch(showSalesDrawer());
  };

  const transformCallLeads = (callLeads) => {
    return callLeads ? callLeads.replace(/_/g, ' ') : '';
  };

  return (
    <div className="mb-1">
      <Drawer
        title="Sales Call Details"
        placement="right"
        closable={true}
        onClose={onClose}
        visible={isEventDrawer}
        width={selectedEvent?.notes ? "70%" : "50%"}
        extra={
          <div className="d-flex w-100 gap-1 justify-content-end mb-1">
            <EditButton onClick={handleUpdate} />
            <Popconfirm
              title="Are you sure to delete this Call?"
              onConfirm={() => handleConfirmDelete(selectedEvent)}
              okText="Yes"
              cancelText="No"
            >
              <DeleteButton>Delete</DeleteButton>
            </Popconfirm>
          </div>
        }
      >
        {selectedEvent?.start && selectedEvent?.end && (
          <div className="mb-1">
            <div style={{ display: "flex", justifyContent: 'space-between', gap: "20px", marginBottom: '20px' }}>
              <Button type="primary" onClick={handleNotesDrawer}>
                {selectedEvent?.notes ? "Update Notes" : "Add Notes"}
              </Button>

              <div className="d-flex justify-content-center align-items-center gap-2">
                <span>Assign To</span>
                <UserList selectedEvent={selectedEvent} />
              </div>
            </div>
            <div className="d-flex justify-content-between">
              <div style={{ marginLeft: '20px', marginTop: "10px", gap: '10px', display: 'flex' }}>
                <div className="mb-1">
                  <span className="fw-bold">Call Status:</span>
                  <span className="m-3" style={{ textTransform: 'capitalize' }}>
                    <StyledTag color={CheckAgendaStatusColor(selectedEvent?.callStatus)} >
                      {selectedEvent?.callStatus}
                    </StyledTag>
                  </span>
                </div>
                <div className="mb-1">
                  <span className="fw-bold">Call Leads:</span>
                  <span className="m-3">
                    <StyledTag color={selectedEvent && CheckAgendaLeadsColor(selectedEvent?.callLeads)}>
                      {selectedEvent && transformCallLeads(selectedEvent?.callLeads)}
                    </StyledTag>
                  </span>
                </div>
              </div>
              <div className="d-flex justify-content-end align-items-end flex-column  mb-1">
                <p>
                  <strong> Date:</strong> {format(new Date(selectedEvent?.start), "dd-MM-yyyy")}
                </p>
                <p>
                  <strong> Time:</strong> {format(new Date(selectedEvent?.start), "p")} -{" "}
                  {format(new Date(selectedEvent?.end), "p")}
                </p>
              </div>
            </div>
          </div>
        )}

        {selectedEvent && selectedEvent?.start && selectedEvent?.end && (
          <div className="d-flex  gap-2">
            <Card className="w-100 shadow m-3 ">
              <table className="table">
                <tbody>
                  <tr>
                    <th className="fw-bold">Company Name :</th>
                    <td style={{ textTransform: 'capitalize' }}>{selectedEvent?.apply?.companyName}</td>
                  </tr>

                  <tr>
                    <th className="fw-bold">Job Title :</th>
                    <td style={{ textTransform: 'capitalize' }}>{selectedEvent?.apply?.positionToApply ? selectedEvent?.apply?.positionToApply.replace(/_/g, ' ') : ''}</td>
                  </tr>
                  <tr>
                    <th className="fw-bold">Call Duration :</th>
                    <td style={{ textTransform: 'capitalize' }}>{selectedEvent?.callDuration} </td>
                  </tr>

                  <tr>
                    <th className="fw-bold">Call Type :</th>
                    <td style={{ textTransform: 'capitalize' }}>{selectedEvent?.callType}</td>
                  </tr>

                  {/* <tr>
                    <th className="fw-bold">Apply Platform :</th>
                    <td style={{ textTransform: 'capitalize' }}>{selectedEvent?.apply?.platform}</td>
                  </tr> */}

                  <tr>
                    <th className="fw-bold">Call Link :</th>
                    <td>
                      <a href={selectedEvent?.callLink} target="_blank">Call</a>
                    </td>
                  </tr>
                  <tr>
                    <th className="fw-bold">Phone Number :</th>
                    <td style={{ textTransform: 'capitalize', fontFamily: 'inherit', fontSize: 'inherit', fontWeight: 'inherit' }}>
                      {selectedEvent?.phoneNumber}
                    </td>
                  </tr>
                  <tr>
                    <th className="fw-bold">Company Information :</th>
                    <td style={{ textTransform: 'capitalize' }}>{selectedEvent?.companyInformation}</td>
                  </tr>
                </tbody>
              </table>
            </Card>

            {selectedEvent?.notes &&
              selectedEvent?.notes !== null &&
              selectedEvent?.notes !== "" && (
                <Card className="w-100 shadow m-3" title="Notes" style={{ maxHeight: "600px", overflow: "auto" }}>
                  <div dangerouslySetInnerHTML={{ __html: selectedEvent?.notes }} />
                </Card>
              )}
          </div>
        )}

        {selectedEvent && selectedEvent?.start && selectedEvent?.end && (
          <div className="w-100 text-end">
            <div className="mb-1">
              <span className="fw-bold">Profile:</span>
              <span className="m-3" style={{ textTransform: 'capitalize' }}>
                {selectedEvent?.apply?.profile?.name}
              </span>
            </div>
            <div className="mb-1">
              <span className="fw-bold">Created By:</span>
              <span className="m-3" style={{ textTransform: 'capitalize' }}>
                {selectedEvent?.createdBy?.first_name} {selectedEvent?.createdBy?.last_name}
              </span>
            </div>
            <div className="mb-1">
              <span className="fw-bold">Created Date:</span>
              <span className="m-3">
                {selectedEvent?.createdAt ? new Date(selectedEvent?.createdAt).toLocaleDateString() : ''}
              </span>
            </div>
          </div>
        )}

      </Drawer>

      <NotesDrawer
        isDrawerOpen={isNotesDrawer}
        handleDrawerClose={handleNotesDrawer}
      />
    </div>
  );
};

export default SalesCallDetailsDrawer;
