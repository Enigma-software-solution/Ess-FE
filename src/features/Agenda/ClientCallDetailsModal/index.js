import { Button, Flex, Modal } from 'antd'
import React, { useEffect, useState } from 'react'


const ClientCallDetailsModal = ({ isOpen, handleClose }) => {

    return (
        <div>
            <Modal title="Client call details"
                open={isOpen}
                footer={null}
                onCancel={() => handleClose(false)}

                styles={{
                    mask: {
                        opacity: .2
                    },
                }}
            // mask={false}
            >
                <Flex gap={6} vertical className='p-4' >

                </Flex>
            </Modal>
        </div >
    )
}

export default ClientCallDetailsModal