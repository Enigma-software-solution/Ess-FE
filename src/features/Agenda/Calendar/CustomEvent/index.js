import React from 'react'

const CustomEvent = ({ event }) => {
  return (
    <div className='d-flex justify-content-center align-center flex-column'>
      <span style={{ fontSize: '12px', fontWeight: 'bold' }}>
        {event?.client?.apply?.clientName || event?.apply?.clientName}</span>
      {event?.assignTo && (
        <>
          <span style={{ fontSize: '12px' }}><b>Assign To :</b>
            {` ${event?.assignTo?.first_name}`}
          </span>

        </>
      )}
    </div>
  )
}

export default CustomEvent