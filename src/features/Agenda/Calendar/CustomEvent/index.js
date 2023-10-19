import React from 'react'

const CustomEvent = ({ event }) => {
  return (
    <div className='d-flex justify-content-center align-center flex-column'>
      <p style={{ fontSize: '12px', fontWeight: 'bold' }}>
        {event?.client || event?.apply?.companyName}
      </p>

      {event?.assignTo && (
        <p style={{ fontSize: '12px' }}><b>Assign To :</b>
          {event?.assignTo?.first_name}
        </p>
      )}
    </div>
  )
}

export default CustomEvent