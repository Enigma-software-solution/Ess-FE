
import React from 'react'

import { Button, Col, Form, Input, Row, Space,Drawer } from 'antd'


const ApplyDrawer= ({ isOpen, handleDrawer }) => {

    const extra =
        <Space>
            <Button onClick={handleDrawer}>Cancel</Button>
            <Button onClick={() => { }} type="primary">
                Submit
            </Button>
        </Space>

    return (
        <Drawer open={isOpen} onClose={handleDrawer} extra={extra} width={800} >
            <Form layout="vertical" hideRequiredMark>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="name"
                            label="Name"
                            rules={[{ required: true, message: 'Please enter user name' }]}
                        >
                            <Input placeholder="Please enter user name" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="email"
                            label="Email"
                            rules={[{ required: true, message: 'Please enter email' }]}
                        >
                            <Input
                                placeholder="Please enter email"
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>

                    <Col span={12}>
                        <Form.Item
                            name="phone"
                            label="Phone"
                            rules={[{ required: true, message: 'Please enter phone number' }]}
                        >
                            <Input
                                placeholder="Please enter phone"
                            />
                        </Form.Item>
                    </Col>
                </Row>


            </Form>

        </Drawer>
    )
}

export default ApplyDrawer