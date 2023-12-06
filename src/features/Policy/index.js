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


    const navigate = useNavigate()

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

            <Button onClick={() => navigate(-1)}>Back</Button>

            <div className='w-25'>
                <PolicySidebar handleClick={handlePolicyClick} />
            </div>

            <div className='w-75'  >
                <PolicyContent selectedPolicy={selectedPolicy} />
            </div>

            <div>
                <Button type="primary" onClick={showModal}>
                    Create
                </Button>
                <Modal
  title="Create New Policy"
  visible={isModalVisible}
  onOk={handleOk}
  onCancel={handleCancel}
>
  <div>
    <label htmlFor="title">Title:</label>
    <Input id="title" size="large" placeholder="Enter Title" />
  </div>
  <div className='mb-2' style={{ maxHeight: '60vh', overflow: 'auto' }}>
    <label htmlFor="quillEditor">Content:</label>
    <ReactQuill
      id="quillEditor"
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
      style={{ maxHeight: '100%', height: '100%' }}
    />
  </div>
                </Modal>

            </div>
        </Flex>
    )
}

export default Policy