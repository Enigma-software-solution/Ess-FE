import AddButton from 'src/components/buttons/AddButton'
import React, { useState } from 'react'
import Drawer from '../Drawer'
import { Button } from 'antd'


const Header = () => {
    const [isOpen, setIsOpen] = useState(false)

    const handleDrawer = () => {
        setIsOpen(!isOpen)
    }


    return (
        <div className='d-flex justify-content-between mb-2'>
            <div className='d-flex gap-1'>
                <Button>Today</Button>
                <Button>Yesterday</Button>
                <Button>Last Week</Button>
            </div>
            <AddButton onClick={handleDrawer} text='New Apply' />
            <Drawer isOpen={isOpen} handleDrawer={handleDrawer} />

        </div>
    )
}

export default Header