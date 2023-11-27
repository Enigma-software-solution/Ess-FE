import React from 'react'
import { Wrapper } from './styled'
import { CheckCircleTwoTone } from '@ant-design/icons'

const AfterConfirmationEmail = () => {
    return (
        <Wrapper>
            <img src="https://img.freepik.com/premium-vector/opened-envelope-document-with-green-check-mark-line-icon-official-confirmation-message-mail-sent-successfully-email-delivery-verification-email-flat-design-vector_662353-720.jpg?w=740" alt="confirmation_Image" />
            <h3>Your Email Has Been Confirmed <CheckCircleTwoTone twoToneColor="#52c41a" /></h3>
            <p>Your email has been confirmed and your account has been created successfully</p>
        </Wrapper>
    )
}

export default AfterConfirmationEmail
