import { Button, Flex, Input, Modal } from 'antd'
import React, { useState } from 'react'
import PolicySidebar from './PolicySidebar'
import PolicyContent from './PolicyContent'
import { useNavigate } from 'react-router-dom'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Policy = () => {
    const [selectedPolicy, setsSlectedPolicy] = useState('introduction')
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [quillContent, setQuillContent] = useState('');



    const handlePolicyClick = (value) => {
        setsSlectedPolicy(value)
    }

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
        const InputVal = document.getElementById('title').value;
        console.log('Title:', InputVal);
        console.log('Quill Content:', quillContent);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };


    return (
        <Flex>
            <div style={{ flex: 1 }}>
                <PolicySidebar handleClick={handlePolicyClick} />

            </div>

            <div style={{ flex: 5 }}>
                <PolicyContent selectedPolicy={selectedPolicy} />

            </div>

            <div>
                <Button type="primary" onClick={showModal}>
                    Create
                </Button>
                <Modal
                    width={'60vw'}
                    title="Create New Policy"
                    open={isModalVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                >
                    <div>
                        <label htmlFor="title">Title:</label>
                        <Input id="title" size="large" placeholder="Enter Title" />
                    </div>
                    <label className='mt-4' htmlFor="quillEditor">Content:</label>
                    <div className='mb-2' style={{ height: '400px', overflow: 'auto' }} >
                        <ReactQuill
                            style={{ minHeight: '300px', height: '350px' }}
                            value={quillContent}
                            onChange={setQuillContent}
                            modules={{
                                toolbar: [
                                    ['bold', 'italic', 'underline', 'strike'],
                                    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                                    ['link', 'image'],
                                    ['clean'],
                                ],
                            }}
                            formats={[
                                'header',
                                'font',
                                'size',
                                'bold',
                                'italic',
                                'underline',
                                'strike',
                                'blockquote',
                                'list',
                                'bullet',
                                'indent',
                                'link',
                                'image',
                            ]}
                        />
                    </div>
                </Modal>

            </div>
        </Flex>
    )
}
export default Policy