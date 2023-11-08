import React from 'react'
import { StyledDiv } from './styled'
import { Avatar } from 'antd'

const ViewUser = () => {
    return (
        <StyledDiv>
            <Avatar
                size={"large"}
                src="https://joesch.moe/api/v1/random"
                style={{ border: "1px solid lightgray" }}
            />
            ViewUser
        </StyledDiv>
    )
}

export default ViewUser
