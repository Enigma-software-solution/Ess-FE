import React, { useState } from 'react';
import DailyApplyDrawer from '../Drawers/CreateDrawer';
import { Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProfiles } from 'src/store/slices/profielSlice/selectors';
import { getdailyAppliesApi } from 'src/store/slices/dailyApplySlice/apis';
import qs from 'qs';
import CustomSearchField from 'src/components/SearchField';
import DateRangePicker from 'src/components/DateRangePicker';
import AddButton from 'src/components/buttons/AddButton';

const { Option } = Select;

const Header = () => {
  const dispatch = useDispatch();
  const allProfiles = useSelector(getAllProfiles);

  const [isOpen, setIsOpen] = useState(false);

  const handleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const handleChangeProfile = (value) => {
    const params = {
      profileId: value,
    };
    const queryStringResult = qs.stringify(params);
    dispatch(getdailyAppliesApi(queryStringResult));
  };

  const handleDateRangeChange = (dates) => {
    if (dates && dates.length === 2) {
        const params = {
          startDate: dates[0].format('YYYY-MM-DD'),
          endDate: dates[1].format('YYYY-MM-DD'),
        };

        const queryStringResult = qs.stringify(params);
        dispatch(getdailyAppliesApi(queryStringResult));
    
    }
     
  };

  const search = (e) => {
    const params = {
      search: e.target.value,
    };
    const queryStringResult = qs.stringify(params);
    dispatch(getdailyAppliesApi(queryStringResult));
  };

  return (
    <div className='d-flex justify-content-between mb-2'>
      <div className='d-flex gap-1'>
        <CustomSearchField onChange={search} />
        <Select placeholder='Please select a Profile' onChange={handleChangeProfile}>
          {allProfiles?.map((profile) => (
            <Option key={profile?._id} value={profile?._id}>
              {profile?.name}
            </Option>
          ))}
        </Select>
        {/* Include the DateRangePicker component */}
        <DateRangePicker onChange={handleDateRangeChange} />
      </div>
      <AddButton onClick={handleDrawer} text='New Apply' />
      <DailyApplyDrawer isOpen={isOpen} handleDrawer={handleDrawer} />
    </div>
  );
};

export default Header;
