import React from 'react'
import { Wrapper } from './styled'
import { CheckCircleTwoTone } from '@ant-design/icons'
import confirmationimage from 'src/assets/confirmimage.jpg'


const AfterConfirmationEmail = () => {
    return (
        <Wrapper>
            <img src={confirmationimage} alt="confirmation_Image" />
            <h3>Your Email Has Been Confirmed <CheckCircleTwoTone twoToneColor="#52c41a" /></h3>
            <p>Your email has been confirmed and your account has been created successfully</p>
        </Wrapper>
    )
}

export default AfterConfirmationEmail
