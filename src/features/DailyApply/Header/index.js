import AddButton from 'src/components/buttons/AddButton'
import React, { useState } from 'react'
import Drawer from '../Drawer'
import { Select, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux'
import { getAllProfiles } from 'src/store/slices/profielSlice/selectors'
import { getProfilesApi } from 'src/store/slices/profielSlice/apis';

const { Option } = Select;


const Header = () => {

    const dispatch = useDispatch()
    const allProfiles = useSelector(getAllProfiles);

    const [isOpen, setIsOpen] = useState(false)

    const handleDrawer = () => {
        setIsOpen(!isOpen)
    }

    const handleChangeProfile = (value) => {
        dispatch(getProfilesApi())
        console.log(value, "profile")
    }

    return (

        <div className='d-flex justify-content-between mb-2'>
            <div className='d-flex gap-1'>
                <Button>Today</Button>
                <Button>Yesterday</Button>
                <Button>Last Week</Button>
                <Select placeholder="Please select a Profile" onChange={handleChangeProfile}>

                    {allProfiles?.map((profile) => (
                        <Option key={profile?._id} value={profile?._id}>
                            {profile?.name}
                        </Option>
                    ))}
                </Select>
            </div>
            <AddButton onClick={handleDrawer} text='New Apply' />
            <Drawer isOpen={isOpen} handleDrawer={handleDrawer} />

        </div>
    )
}

export default Header