import React from 'react'
import { Circle, StyledCard } from './styled'
import { Divider } from 'antd'

const CountCard = ({ title, count }) => {
    return (
        <>
            <StyledCard>
                <div className='d-flex  align-items-center'>
                    <h5>{title}</h5>
                    <Divider type='vertical ' />
                </div>

                <div className='d-flex align-items-center gap-3 mt-3'>
                    <Circle />
                    <h2>
                        {count}
                    </h2>
                </div>

            </StyledCard>
        </>
    )
}

export default CountCard