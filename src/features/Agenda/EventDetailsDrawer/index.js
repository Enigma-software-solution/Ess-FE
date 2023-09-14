import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button, Card, Drawer } from "antd";
import styled from "styled-components";
import { format } from "date-fns";
import { getSelectEvent } from "src/store/slices/agenda/selector";
import NotesDrawer from "../NotesDrawer";

const EventDetails = styled.div`
  margin-bottom: 15px;
`;

const EventLabel = styled.span`
  font-weight: bold;
`;

const EventValue = styled.span`
  margin-left: 5px;
`;

const EventDetailsDrawer = ({ isDrawerOpen, handleDrawerClose }) => {
  const [isNotesDrawer, setIsNotesDrawer] = useState(false);

  const selectedEvent = useSelector(getSelectEvent);

  // Function to format date
  const formatDate = (dateString) => {
    return format(new Date(dateString), "MMMM dd, yyyy HH:mm");
  };

  const handleNotesDrawer = () => {
    setIsNotesDrawer(!isNotesDrawer);
  };

  return (
    <div>
      <Drawer
        title="Call Details"
        placement="right"
        closable={true}
        onClose={handleDrawerClose}
        visible={isDrawerOpen}
        width={selectedEvent.notes ? '70%' : '50%'}
      >
        <div className="d-flex w-100 justify-content-end mb-2">
          <Button
            type="primary"
            onClick={handleNotesDrawer}
          >
            {selectedEvent?.notes ? "Update Notes" : "Add notes"}
          </Button>
        </div>

        {selectedEvent && selectedEvent.start && selectedEvent.end && (
          <div className="d-flex gap-2">
            <Card className="w-100" title="Event information">
              <EventDetails>
                <EventLabel>Company Name:</EventLabel>
                <EventValue>{selectedEvent.companyName}</EventValue>
              </EventDetails>
              <EventDetails>
                <EventLabel>Job Title:</EventLabel>
                <EventValue>{selectedEvent.jobTitle}</EventValue>
              </EventDetails>
              <EventDetails>
                <EventLabel>Start Time:</EventLabel>
                <EventValue>{formatDate(selectedEvent.start)}</EventValue>
              </EventDetails>
              <EventDetails>
                <EventLabel>End Time:</EventLabel>
                <EventValue>{formatDate(selectedEvent.end)}</EventValue>
              </EventDetails>
              <EventDetails>
                <EventLabel>Call Duration:</EventLabel>
                <EventValue>{selectedEvent.callDuration} seconds</EventValue>
              </EventDetails>
              <EventDetails>
                <EventLabel>Number of Guests:</EventLabel>
                <EventValue>{selectedEvent.numOfGuests}</EventValue>
              </EventDetails>
              <EventDetails>
                <EventLabel>Call Type:</EventLabel>
                <EventValue>{selectedEvent.callType}</EventValue>
              </EventDetails>
              <EventDetails>
                <EventLabel>Call Mode:</EventLabel>
                <EventValue>{selectedEvent.callMode}</EventValue>
              </EventDetails>
              <EventDetails>
                <EventLabel>Call Platform:</EventLabel>
                <EventValue>{selectedEvent.callPlatform}</EventValue>
              </EventDetails>
              <EventDetails>
                <EventLabel>Initial Conversion:</EventLabel>
                <EventValue>{selectedEvent.initialConversion}</EventValue>
              </EventDetails>
              {/* Additional EventDetails for created date, profile name, and user name */}
              <EventDetails>
                <EventLabel>Created Date:</EventLabel>
                <EventValue>{formatDate(selectedEvent.createdAt)}</EventValue>
              </EventDetails>
              <EventDetails>
                <EventLabel>Profile Name:</EventLabel>
                <EventValue>{selectedEvent.profile.name}</EventValue>
              </EventDetails>
              <EventDetails>
                <EventLabel>User Name:</EventLabel>
                <EventValue>
                  {selectedEvent.user.first_name} {selectedEvent.user.last_name}
                </EventValue>
              </EventDetails>
            </Card>

            {selectedEvent.notes &&
              selectedEvent?.notes !== null &&
              selectedEvent.notes !== "" && (
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
