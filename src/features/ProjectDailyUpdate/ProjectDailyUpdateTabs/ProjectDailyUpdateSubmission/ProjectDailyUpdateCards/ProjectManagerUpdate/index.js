import React, { useState } from 'react';
import { Input, Rate, Button } from 'antd';
import { capitalize } from 'lodash';
import { useDispatch } from 'react-redux';
import { updateDailyUpdate } from 'src/store/slices/projectDailyUpdates/apis';

const ProjectManagerUpdate = ({ record, isProjectManager }) => {
    console.log(record, "rec")
    const [managerFeedback, setManagerFeedback] = useState(record?.managerFeedback || '');
    const [rating, setRating] = useState(record.rating || 0);

    const dispatch = useDispatch();

    const handleTextChange = (e) => {
        setManagerFeedback(e.target.value);
    };

    const handleRatingChange = (value) => {
        setRating(value);
    };

    const handleSave = () => {
        const data = {
            managerFeedback: managerFeedback,
            rating: rating,
        }
        dispatch(updateDailyUpdate({ id: record._id, data }));
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
                        value={managerFeedback}
                        onChange={handleTextChange}
                        placeholder='Write your update...'
                        autoSize={{ minRows: 3, maxRows: 5 }}
                    />
                    <Rate value={rating} onChange={handleRatingChange} style={{ marginTop: '10px' }} />
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
