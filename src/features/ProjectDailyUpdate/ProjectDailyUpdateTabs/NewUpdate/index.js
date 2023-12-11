import React, { useState } from 'react';
import { Button, DatePicker, Select } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import moment from 'moment';

const { Option } = Select;

const NewUpdate = () => {
    const [formData, setFormData] = useState({
        date: moment(),
        project: '',
        content: '',
    });

    const disabledDate = (current) => {
        return current && !current.isSame(moment(), 'day');
    };

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

    const handleChangeDate = (date) => {
        setFormData((prevData) => ({ ...prevData, date }));
    };

    const handleChangeProject = (value) => {
        setFormData((prevData) => ({ ...prevData, project: value }));
    };

    const handleChangeContent = (e) => {
        setFormData((prevData) => ({ ...prevData, content: e.target.value }));
    };

    const handleClick = () => {
        const { date, project, content } = formData;

        console.log('Date:', date.format('YYYY-MM-DD'));
        console.log('Project:', project);
        console.log('Content:', content);
    };

    return (
        <div style={{ padding: '30px' }}>
            <div className="d-flex justify-content-between">
                <DatePicker
                    value={formData.date}
                    onChange={handleChangeDate}
                    disabledDate={disabledDate}
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
            <TextArea
                className="mt-4"
                rows={8}
                placeholder="Start writing the Update..."
                value={formData.content}
                onChange={handleChangeContent}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button onClick={handleClick} className="mt-3" type="primary">
                    SAVE
                </Button>
            </div>
        </div>
    );
};

export default NewUpdate;


// import React from 'react';
// import { Button, DatePicker, Select } from 'antd';
// import TextArea from 'antd/es/input/TextArea';
// import moment from 'moment';

// const { Option } = Select;

// const NewUpdate = () => {
//     const disabledDate = (current) => {
//         return current && !current.isSame(moment(), 'day');
//     };

//     const projects = [
//         {
//             project: 'project 1',
//         },
//         {
//             project: 'project 2',
//         },
//         {
//             project: 'project 3',
//         },
//     ];

//     const handleClick = () => {


//     }

//     return (
//         <div style={{ padding: '30px' }}>
//             <div className="d-flex justify-content-between">
//                 <DatePicker defaultValue={moment()} disabledDate={disabledDate} />
//                 <Select
//                     style={{ width: '180px' }}
//                     placeholder="Select a project"
//                 >
//                     {projects.map((p, index) => (
//                         <Option key={index} value={p.project}>
//                             {p.project}
//                         </Option>
//                     ))}
//                 </Select>
//             </div>
//             <TextArea className="mt-4" rows={8} placeholder="Start writing the Update..." />
//             <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
//                 <Button onClick={handleClick} className="mt-3" type="primary">
//                     SAVE
//                 </Button>
//             </div>
//         </div>
//     );
// };

// export default NewUpdate;

