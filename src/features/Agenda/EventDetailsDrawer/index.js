import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, Drawer, Popconfirm, Select } from "antd";
import { format } from "date-fns";
import {
  checkEventDrawer,
  checkNotesDrawer,
  getSelectEvent,
} from "src/store/slices/agendaSlice/selector";
import NotesDrawer from "../NotesDrawer";
import { DeleteEventsApi } from "src/store/slices/agendaSlice/apis";
import DeleteButton from "src/components/buttons/DeleteButton";
import EditButton from "src/components/buttons/EditButton";
import {
  closeEventDrawer,
  setSelectedEvent,
  showNotesDrawer,
  showSlotDrawer,
} from "src/store/slices/agendaSlice";
import { toast } from "react-toastify";
import UserList from "../UserList";

const EventDetailsDrawer = () => {
  const dispatch = useDispatch();
  const isEventDrawer = useSelector(checkEventDrawer);
  const isNotesDrawer = useSelector(checkNotesDrawer);
  const selectedEvent = useSelector(getSelectEvent);

  const formatDate = (dateString) => {
    return format(new Date(dateString), "MMMM dd, yyyy HH:mm");
  };

  const handleNotesDrawer = () => {
    dispatch(showNotesDrawer());
  };

  const handleConfirmDelete = (record) => {
    try {
      dispatch(DeleteEventsApi(record._id));
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
    dispatch(showSlotDrawer());
  };

  return (
    <div className="mb-1">
      <Drawer
        title="Call Details"
        placement="right"
        closable={true}
        onClose={onClose}
        open={isEventDrawer}
        width={selectedEvent?.notes ? "70%" : "50%"}
        extra={
          <div className="d-flex w-100 gap-1 justify-content-end mb-2">
            <EditButton onClick={handleUpdate} />
            <Popconfirm
              title="Are you sure to delete this task?"
              onConfirm={() => handleConfirmDelete(selectedEvent)}
              okText="Yes"
              cancelText="No"
            >
              <DeleteButton>Delete</DeleteButton>
            </Popconfirm>
          </div>
        }
      >
        {selectedEvent?.start && selectedEvent.end && (
          <div className="mb-1"  >

            <div style={{ display: "flex", justifyContent: 'space-between', gap: "20px", marginBottom: '20px' }}>
              <Button type="primary" onClick={handleNotesDrawer}>
                {selectedEvent?.notes ? "Update Notes" : "Add Notes"}
              </Button>

              <div className="d-flex justify-content-center align-items-center gap-2">
                <span>Assign To</span>
                <UserList selectedEvent={selectedEvent} />
              </div>
            </div>

            <div className="d-flex justify-content-end align-items-end flex-column  mb-1">
              <p>
                Date: {format(new Date(selectedEvent?.start), "dd-MM-yyyy")}
              </p>
              <p>
                Time: {format(new Date(selectedEvent.start), "p")} -{" "}
                {format(new Date(selectedEvent.end), "p")}
              </p>
            </div>
          </div>
        )}

        {selectedEvent && selectedEvent.start && selectedEvent.end && (
          <div className="d-flex gap-2">
            <Card className="w-100" title="Event information">
              <div className="mb-2">
                <span className="fw-bold">Company Name:</span>
                <span className="m-3">{selectedEvent?.apply?.companyName}</span>
              </div>




              <div className="mb-2">
                <span className="fw-bold">Job Title:</span>
                <span className="m-3">
                  {selectedEvent?.apply?.positionToApply}
                </span>
              </div>
              <div className="mb-2">
                <span className="fw-bold">Call Duration:</span>
                <span className="m-3">
                  {selectedEvent.callDuration} seconds
                </span>
              </div>
              <div className="mb-2">
                <span className="fw-bold">Number of Guests:</span>
                <span className="m-3">{selectedEvent.numOfGuests}</span>
              </div>
              <div className="mb-2">
                <span className="fw-bold">Call Type:</span>
                <span className="m-3">{selectedEvent.callType}</span>
              </div>
              <div className="mb-2">
                <span className="fw-bold">Call Mode:</span>
                <span className="m-3">{selectedEvent.callMode}</span>
              </div>
              <div className="mb-2">
                <span className="fw-bold">Apply Platform:</span>
                <span className="m-3">{selectedEvent?.apply?.platform}</span>
              </div>
              <div className="mb-2">
                <span className="fw-bold">Call Platform:</span>
                <span className="m-3">{selectedEvent.callPlatform}</span>
              </div>
              <div className="mb-2">
                <span className="fw-bold">Mail Link:</span>
                <span className="m-3">
                  <a href={selectedEvent?.mailLink}>Mail</a>
                </span>
              </div>
              <div className="mb-2">
                <span className="fw-bold">Call Link:</span>
                <span className="m-3">
                  <a href={selectedEvent?.callLink}>Call</a>
                </span>
              </div>

              <div className="mb-2">
                <span className="fw-bold">Apply Link:</span>
                <span className="m-3">
                  <a href={selectedEvent?.apply?.link}>Apply Link</a>
                </span>
              </div>

              <div className="mb-2">
                <span className="fw-bold">Company Information:</span>
                <span className="m-3">{selectedEvent?.companyInformation}</span>
              </div>
            </Card>

            {selectedEvent?.notes &&
              selectedEvent?.notes !== null &&
              selectedEvent?.notes !== "" && (
                <Card className="w-100" title="Notes" style={{ maxHeight: "500px", overflow: "auto" }}>
                  <div
                    dangerouslySetInnerHTML={{ __html: selectedEvent?.notes }}
                  />
                </Card>
              )}

          </div>
        )}

        {selectedEvent && selectedEvent.start && selectedEvent.end && (
          <div className="w-100 d-flex flex-column align-items-end">
            <div className="mb-2">
              <span className="fw-bold">Profile:</span>
              <span className="m-3">{selectedEvent?.apply?.profile?.name}</span>
            </div>
            <div className="mb-2">
              <span className="fw-bold">Created by:</span>
              <span className="m-3">
                {selectedEvent?.createdBy?.first_name} {selectedEvent?.createdBy?.last_name}
              </span>
            </div>
            <div className="mb-2">
              <span className="fw-bold">Created Date:</span>
              <span className="m-3">
                {formatDate(selectedEvent?.createdAt)}
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

export default EventDetailsDrawer;
