import React, { useState } from 'react';
import { Button, DatePicker, Select } from 'antd';
import moment from 'moment';
import ReactQuill from 'react-quill';

const { Option } = Select;

const DailyProjectNewUpdate = () => {

    const [content, setContent] = useState('');
    const [formData, setFormData] = useState({
        date: moment(),
        project: ''
    });

    const projects = [
        {
            project: 'project 1',
        },
        {
            project: 'project 2',
        },
        {
            project: 'project 3',
        },
    ];

    const handleChangeProject = (value) => {
        setFormData((prevData) => ({ ...prevData, project: value }));
    };

    const handleClick = () => {
        
    };

    const format = [
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
        'color',
    ];

    const module = {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link'],
            ['clean'],
            [{ size: ['small', false, 'large', 'huge'] }], // Add font size option
            [{ color: [] }],

        ],
    };


    return (
        <div style={{ padding: '30px' }}>
            <div className="d-flex justify-content-between">
                <DatePicker
                    disabled
                    value={formData.date}
                />
                <Select
                    style={{ width: '180px' }}
                    placeholder="Select a project"
                    onChange={handleChangeProject}
                >
                    {projects.map((p, index) => (
                        <Option key={index} value={p.project}>
                            {p.project}
                        </Option>
                    ))}
                </Select>
            </div>

            <ReactQuill
                className='my-4'
                style={{ minHeight: '150px', height: '200px' }}
                required
                modules={module}
                formats={format}
                value={content}
                onChange={setContent} // Update content on change
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button onClick={handleClick} className='mt-4' type="primary">
                    SAVE
                </Button>
            </div>
        </div>
    );
};

export default DailyProjectNewUpdate;
