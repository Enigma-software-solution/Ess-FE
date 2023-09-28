import React from 'react'

const CustomEvent = ({event}) => {
  return (
    <div className='p-1'>
    <strong>{event?.apply?.clientName}</strong>
    <br />
    {event?.assignTo && (
      <>
        <strong>Assign To :</strong>
        {` ${event?.assignTo?.first_name} ${event?.assignTo?.last_name}`}
      </>
    )}
  </div>
  )
}

export default CustomEvent