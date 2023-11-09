import React, { useEffect, useState } from 'react';
import { Card, Select } from 'antd';
import avatar from '../../assets/avatar.jpg'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ImageWrapper, InnerCard } from './styled';
import { getAllUsersApi } from 'src/store/slices/userSlice/apis';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from 'src/store/slices/userSlice/selectors';
import { submitAttendanceApi } from 'src/store/slices/attendanceSlice/api';
import { toast } from "react-toastify";




const { Meta } = Card;

const Attendence = () => {

    const users = useSelector(getAllUsers);
    const dispatch = useDispatch();
    const [selecteValue, setSelectedValue] = useState('')

    useEffect(() => {
        if (!users?.length) {
            dispatch(getAllUsersApi());
        }

    }, [])

    const settings = {
        slidesToShow: 5,
        dots: true,
        infinite: true,
        arrows: true,
    };

    const cardStyle = {
        width: '250px',
    };

    const imageStyle = {
        borderRadius: '50%', // Makes the image round
    };
    const currentTime = new Date();
    const nextDay = new Date(currentTime);
    nextDay.setDate(currentTime.getDate() + 1);

    const handleChange = (value, id) => {
        setSelectedValue(value)
        const prepareduser = {
            user: id,
            date: nextDay,
            status: value,
            checkInTime: nextDay,
        };

        const response = dispatch(submitAttendanceApi(prepareduser))
        if (response.status === 'success') { toast.warn('Attendance Submitted') } else {
            toast.warn('Attendance not Submitted')
        }

    };

    return (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
            <Slider touchMove={true} swipeToSlide slidesToScroll={1}  {...settings}>
                {users.map((user) => (
                    <div key={user._id} >
                        <InnerCard hoverable style={cardStyle} >
                            <ImageWrapper>
                                <img width={'150px'} height={'150px'} src={avatar} style={imageStyle} alt="Avatar" />
                            </ImageWrapper>
                            <div>
                                <div style={{ margin: '10px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                    <stack>
                                        <h3>{user.first_name}</h3>
                                        <h3 >{user.last_name}</h3>
                                    </stack>
                                    <h5>{user.role}</h5>
                                    <h6>Status</h6>
                                    <Select
                                        defaultValue="absent"
                                        style={{ width: 120 }}
                                        onChange={(value) => handleChange(value, user._id)}
                                        options={[
                                            { value: 'present', label: 'present' },
                                            { value: 'absent', label: 'absent' },
                                            { value: 'late', label: 'late' },
                                            { value: 'leave', label: 'leave' },
                                            { value: 'half-day', label: 'half-day' },
                                            { value: 'vacation', label: 'vacation' },
                                        ]}
                                    />
                                </div>
                            </div>
                        </InnerCard>
                    </div>
                ))}
            </Slider>
        </div>


    );
};

export default Attendence;
