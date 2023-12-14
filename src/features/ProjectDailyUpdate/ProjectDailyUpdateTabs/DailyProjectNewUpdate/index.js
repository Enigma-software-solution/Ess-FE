import React, { useEffect, useState } from 'react';
import { Button, DatePicker, Select } from 'antd';
import moment from 'moment';
import ReactQuill from 'react-quill';
import { useDispatch, useSelector } from 'react-redux';
import { getAllClientsSelector } from 'src/store/slices/clientSlice/selectors';
import { getAllClientsApi } from 'src/store/slices/clientSlice/apis';
import { getUserId } from 'src/store/slices/authSlice/selectors';
import { createDailyProjectUpdateApi } from 'src/store/slices/projectDailyUpdates/apis';

const { Option } = Select;

const DailyProjectNewUpdate = () => {

    const [content, setContent] = useState('');
    const [formData, setFormData] = useState({
        user: "",
        date: moment(),
        project: '',
        content: ""
    });

    const dispatch= useDispatch()

    const projects = useSelector(getAllClientsSelector)
    const userId = useSelector(getUserId);
    formData.user = userId;

    useEffect(() => {
        const fetchData = async () => {
            try {
                    // Assuming dispatch returns a promise, you can await it
                    await dispatch(getAllClientsApi());
            } catch (error) {
                // Handle the error here
                console.error('Error fetching data:', error);
            }
        };
    
        fetchData();
    
    }, []);

    const handleChangeProject = (value) => {
        setFormData((prevData) => ({ ...prevData, project: value }));
    };

    const handleSave = () => {
        formData.content = content;

        dispatch(createDailyProjectUpdateApi(formData))

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
                    value={formData?.date}
                />
                <Select
                    style={{ width: '180px' }}
                    placeholder="Select a project"
                    onChange={handleChangeProject}
                >
                    {projects?.map((p, index) => (
                        <Option key={index} value={p?._id}>
                            {p?.clientName}
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
                <Button onClick={handleSave} className='mt-4' type="primary">
                    SAVE
                </Button>
            </div>
        </div>
    );
};

export default DailyProjectNewUpdate;
