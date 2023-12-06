import React from 'react'

const PolicyContent = ({ selectedPolicy }) => {


    return (
        <div className='p-5'>
            {
                selectedPolicy === 'introduction' && <h1>intorduction policy selected we can add content here</h1>
            }

            {
                selectedPolicy === 'abc' && <h1>abc policy selected we can add content here</h1>
            }

            {
                selectedPolicy === 'xyz' && <h1>xyz policy selected we can add content here</h1>
            }

        </div>
    )
}

export default PolicyContent