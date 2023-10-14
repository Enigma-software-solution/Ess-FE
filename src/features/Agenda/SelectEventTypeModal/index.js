import { Button, Flex, Modal } from 'antd'
import React from 'react'
import { useDispatch } from 'react-redux'
import { showClientEventDrawer, showSalesDrawer } from 'src/store/slices/agendaSlice'


const SelectEventTypeModal = ({ isOpen, handleClose }) => {
    const dispatch = useDispatch()

    const handleSalesCall = () => {
        dispatch(showSalesDrawer())
        handleClose()
    }

    const handleClientCall = () => {
        dispatch(showClientEventDrawer())
        handleClose()
    }

    return (
        <div>
            <Modal title="Event Type"
                open={isOpen}
                footer={null}
                onCancel={() => handleClose(false)}
            >
                <Flex gap={6} vertical className='p-4' >
                    <Button type='primary' onClick={handleSalesCall}>Sales Call</Button>
                    <Button onClick={handleClientCall}>Client Call</Button>
                </Flex>
            </Modal>
        </div>
    )
}

export default SelectEventTypeModal