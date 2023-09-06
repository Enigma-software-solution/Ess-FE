"use client"
import React from 'react'
import { StyledDeleteButton } from './styled'
import { Button } from 'antd'


const DeleteButton= ({ onClick }) => {
    return (
        <Button
            icon={<StyledDeleteButton />}
            onClick={onClick}
        />
    )
}

export default DeleteButton