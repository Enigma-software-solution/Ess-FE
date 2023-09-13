import React from 'react'
import { useSelector } from 'react-redux'
import { Card, Drawer } from 'antd';
import styled from 'styled-components';
import { format } from 'date-fns'
import { getSelectAgenda } from 'src/store/slices/agenda/selector';

const EventCard = styled(Card)`
  width: 600px;
  margin: 20px auto;
`;

const EventDetails = styled.div`
  margin-bottom: 15px;
`;

const EventLabel = styled.span`
  font-weight: bold;
`;

const EventValue = styled.span`
  margin-left: 5px;
`;



// const selectedEvent = {
//     "start": "2023-08-10T04:00:00.000Z",
//     "end": "2023-08-11T04:30:00.000Z",
//     "eventName": "test",
//     "companyName": "sdl",
//     "numOfGuests": "3",
//     "guests": "tess@gmal.com\ntessfdsds@gmal.com\ntess@gmal.com",
//     "callType": "initialCall",
//     "callPlatform": "zoom",
//     "initialConversation": "In this code, I've defined TypeScript types for the Guest object, the form values CreateEventFormValues, and the CreateEventDrawerProps. You can replace the guests field type with an array of Guest if you decide to use Form.List for dynamically adding guests.",
//     "companyInformation": "this is a startup \nhairing new members for "
// }


const EventDetailsDrawer= ({ isDrawerOpen, handleDrawerClose }) => {
    const selectedEvent = useSelector(getSelectAgenda)
    return (
        <div>

            <Drawer
                title="Call Details"
                placement="right"
                closable={true}
                onClose={handleDrawerClose}
                open={isDrawerOpen}
                width={700}
            >

{
    selectedEvent && selectedEvent.start && selectedEvent.end && 
              <>
              <div className="d-flex justify-content-end align-items-end flex-column  mb-1">
                    <p>Date: {format(new Date(selectedEvent?.start), 'dd-MM-yyyy')}</p>
                    <p>
                        Time: {format(new Date(selectedEvent.start), 'p')} -{' '}
                        {format(new Date(selectedEvent.end), 'p')}
                    </p>
                </div>
                <EventCard title="Event Details">
                    <EventDetails>
                        <EventLabel>Event Name:</EventLabel>
                        <EventValue>{selectedEvent.eventName}</EventValue>
                    </EventDetails>
                    <EventDetails>
                        <EventLabel>Company Name:</EventLabel>
                        <EventValue>{selectedEvent.companyName}</EventValue>
                    </EventDetails>
                    <EventDetails>
                        <EventLabel>Number of Guests:</EventLabel>
                        <EventValue>{selectedEvent.numOfGuests}</EventValue>
                    </EventDetails>
                    <EventDetails>
                        <EventLabel>Guests:</EventLabel>
                        <EventValue>{selectedEvent.guests}</EventValue>
                    </EventDetails>
                    <EventDetails>
                        <EventLabel>Call Type:</EventLabel>
                        <EventValue>{selectedEvent.callType}</EventValue>
                    </EventDetails>
                    <EventDetails>
                        <EventLabel>Call Platform:</EventLabel>
                        <EventValue>{selectedEvent.callPlatform}</EventValue>
                    </EventDetails>
                    <EventDetails>
                        <EventLabel>Initial Conversation:</EventLabel>
                        <EventValue>{selectedEvent.initialConversation}</EventValue>
                    </EventDetails>
                    <EventDetails>
                        <EventLabel>Company Information:</EventLabel>
                        <EventValue>{selectedEvent.companyInformation}</EventValue>
                    </EventDetails>
                </EventCard>
              </>

}

            </Drawer>
        </div>
    )
}

export default EventDetailsDrawer