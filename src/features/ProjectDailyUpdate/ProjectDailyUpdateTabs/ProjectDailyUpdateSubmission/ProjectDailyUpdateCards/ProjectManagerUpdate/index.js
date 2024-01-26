import React, { useState } from 'react';
import { Input, Rate, Button } from 'antd';
import { capitalize } from 'lodash';

const ProjectManagerUpdate = ({ record, isProjectManager }) => {
    const [editedText, setEditedText] = useState(record.project?.projectManagerUpdate || '');
    const [editedRating, setEditedRating] = useState(record.project?.projectManagerRating || 0);

    const handleTextChange = (e) => {
        setEditedText(e.target.value);
    };

    const handleRatingChange = (value) => {
        setEditedRating(value);
    };

    const handleSave = () => {
        console.log('Save Text:', editedText);
        console.log('Save Rating:', editedRating);
    };

    return (
        <div>
            <h6 className=' pb-2 mt-3'>
                {capitalize(record.project?.projectManager?.first_name)}{' '}
                {capitalize(record.project?.projectManager?.last_name || 'No project manager')}
            </h6>

            {isProjectManager ? (
                <>
                    <Input.TextArea
                        value={editedText}
                        onChange={handleTextChange}
                        placeholder='Write your update...'
                        autoSize={{ minRows: 3, maxRows: 5 }}
                    />
                    <Rate value={editedRating} onChange={handleRatingChange} style={{ marginTop: '10px' }} />
                    <Button type='primary' onClick={handleSave} style={{ marginTop: '10px' }}>
                        Save
                    </Button>
                </>
            ) : (
                <>
                    <div>Update: {record?.project?.projectManagerUpdate || 'No update available'}</div>
                    <div>Rating: {record?.project?.projectManagerRating || 'No rating available'}</div>
                </>
            )}
        </div>
    );
};

export default ProjectManagerUpdate;
