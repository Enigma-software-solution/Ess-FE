import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, Drawer, Popconfirm } from "antd";
import styled from "styled-components";
import { format } from "date-fns";
import { getSelectEvent } from "src/store/slices/agenda/selector";
import NotesDrawer from "../NotesDrawer";
import { DeleteEventsApi } from "src/store/slices/agenda/apis";
import DeleteButton from "src/components/buttons/DeleteButton";
import EditButton from "src/components/buttons/EditButton";

const Div = styled.div`
  margin-bottom: 15px;
`;

const EventLabel = styled.span`
  font-weight: bold;
`;

const EventValue = styled.span`
  margin-left: 5px;
`;

const EventDetailsDrawer = ({ isDrawerOpen, handleDrawerClose, showCreateEventDrawer }) => {
  const [isNotesDrawer, setIsNotesDrawer] = useState(false);

  const dispatch = useDispatch()

  const selectedEvent = useSelector(getSelectEvent);

  const formatDate = (dateString) => {
    return format(new Date(dateString), "MMMM dd, yyyy HH:mm");
  };

  const handleNotesDrawer = () => {
    setIsNotesDrawer(!isNotesDrawer);
  };

  const handleConfirmDelete = (record) => {
    console.log(record._id, "12345")
    dispatch(DeleteEventsApi(record._id))
  }

  return (
    <div>
      <Drawer
        title="Call Details"
        placement="right"
        closable={true}
        onClose={handleDrawerClose}
        visible={isDrawerOpen}
        width={selectedEvent?.notes ? '70%' : '50%'}
        extra={
          <div className="d-flex w-100 gap-1 justify-content-end mb-2">

            <EditButton onClick={() => showCreateEventDrawer(true)}></EditButton>
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
        {
          selectedEvent?.start && selectedEvent.end &&
          <div>
            <Button
              type="primary"
              onClick={handleNotesDrawer}
            >
              {selectedEvent?.notes ? "Update Notes" : "Add Notes"}
            </Button>

            <div className="d-flex justify-content-end align-items-end flex-column  mb-1">
              <p>Date: {format(new Date(selectedEvent?.start), "dd-MM-yyyy")}</p>
              <p>
                Time: {format(new Date(selectedEvent.start), "p")} -{" "}
                {format(new Date(selectedEvent.end), "p")}
              </p>
            </div>
          </div>
        }

        {selectedEvent && selectedEvent.start && selectedEvent.end && (
          <div className="d-flex gap-2">
            <Card className="w-100" title="Event information">
              <Div>
                <EventLabel>Company Name:</EventLabel>
                <EventValue>{selectedEvent.companyName}</EventValue>
              </Div>
              <Div>
                <EventLabel>Job Title:</EventLabel>
                <EventValue>{selectedEvent.jobTitle}</EventValue>
              </Div>
              <Div>
                <EventLabel>Call Duration:</EventLabel>
                <EventValue>{selectedEvent.callDuration} seconds</EventValue>
              </Div>
              <Div>
                <EventLabel>Number of Guests:</EventLabel>
                <EventValue>{selectedEvent.numOfGuests}</EventValue>
              </Div>
              <Div>
                <EventLabel>Call Type:</EventLabel>
                <EventValue>{selectedEvent.callType}</EventValue>
              </Div>
              <Div>
                <EventLabel>Call Mode:</EventLabel>
                <EventValue>{selectedEvent.callMode}</EventValue>
              </Div>
              <Div>
                <EventLabel>Call Platform:</EventLabel>
                <EventValue>{selectedEvent.callPlatform}</EventValue>
              </Div>
              <Div>
                <EventLabel>Call Platform:</EventLabel>
                <EventValue>{selectedEvent.callPlatform}</EventValue>
              </Div>
              <Div>
                <EventLabel>Mail Link:</EventLabel>
                <EventValue><a href={selectedEvent?.mailLink}>Mail</a></EventValue>
              </Div>

            </Card>

            {selectedEvent?.notes &&
              selectedEvent?.notes !== null &&
              selectedEvent?.notes !== "" && (
                <Card className="w-100" title="Notes">
                  <div
                    dangerouslySetInnerHTML={{ __html: selectedEvent?.notes }}
                  />
                </Card>
              )}
          </div>
        )}

        {selectedEvent && selectedEvent.start && selectedEvent.end && (
          <div className="w-100 d-flex flex-column align-items-end">
            <div>
              <EventLabel>Profile:</EventLabel>
              <EventValue>{selectedEvent.profile.name}</EventValue>
            </div>
            <div>
              <EventLabel>User:</EventLabel>
              <EventValue>
                {selectedEvent.user.first_name} {selectedEvent.user.last_name}
              </EventValue>
            </div>
            <div>
              <EventLabel>Created Date:</EventLabel>
              <EventValue>{formatDate(selectedEvent.createdAt)}</EventValue>
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
