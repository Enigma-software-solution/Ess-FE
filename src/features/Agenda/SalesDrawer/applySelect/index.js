// ApplySelect.js
import React, { useState, useEffect } from 'react';
import { Select } from 'antd';
import { format } from 'date-fns';
import { useDispatch } from 'react-redux';
import { getApplyBySearchApi } from 'src/store/slices/agendaSlice/apis';
import qs from 'qs';

const { Option } = Select;

const ApplySelect = ({ onSelect }) => {
    const dispatch = useDispatch();

    const [applies, setApplies] = useState([]);

    const fetchApplyData = async (searchText) => {
        const params = qs.stringify({ search: searchText });
        try {
            const res = await dispatch(getApplyBySearchApi(params)).unwrap();
            setApplies(res.data?.daily_applies || []);
        } catch (error) {
            console.error('Error fetching applies:', error);
        }
    };

    return (
        <Select
            style={{ width: '100%' }}
            showSearch
            onSearch={fetchApplyData}
            placeholder="Select an applies"
            optionFilterProp="children"
            onSelect={onSelect}
        >
            {applies?.map((apply) => (
                <Option key={apply._id} value={apply._id}>
                    {apply.companyName}

                </Option>
            ))}
        </Select>
    );
};

export default ApplySelect;
