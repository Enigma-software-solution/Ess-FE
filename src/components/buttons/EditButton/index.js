"use client"
import React from 'react'
import { StyledEditButton } from './styled'
import { Button } from 'antd'


const EditButton= ({ onClick }) => {
    return (
        <Button
            icon={<StyledEditButton />}
            onClick={onClick}
        />
    )
}

export default EditButton