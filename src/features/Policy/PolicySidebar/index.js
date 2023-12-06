import React from 'react'

const PolicySidebar = ({ handleClick }) => {

    const list = [
        'introduction',
        'abc',
        'xyz',
    ]


    return (
        <div className='p-3'>
            {
                list?.map((item) => {
                    return (
                        <h5 onClick={() => handleClick(item)}>{item}</h5>
                    )
                })
            }
        </div>
    )
}

export default PolicySidebar

// https://dribbble.com/shots/21010477-Daily-UI-089-Terms-of-Services