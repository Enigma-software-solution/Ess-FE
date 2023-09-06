import AddButton from 'src/components/buttons/AddButton'
import { Input, Space } from 'antd'
import React, { useState } from 'react'
import Drawer from '../Drawer'


const Header = () => {
    const [isOpen, setIsOpen] = useState(false)

    const handleDrawer = () => {
        setIsOpen(!isOpen)
    }


    return (
        <div className='d-flex justify-content-between mb-2'>
            <Input.Search placeholder='Search' className='w-25' size='large' allowClear />
            <AddButton onClick={handleDrawer} text='Add New User' />
            <Drawer isOpen={isOpen} handleDrawer={handleDrawer} />

        </div>
    )
}

export default Header