import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Button, Box } from '@mui/material';
import Slider from 'react-slick'; // Import the Slider component from react-slick
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { CarouselContainer, CarouselSlide, CarouselCenterSlide } from './styled'; // Import your styled components



const Attendence = () => {
    const [persons, setPersons] = useState([
        {
            id: 1,
            name: 'Kashif',
            image: 'https://via.placeholder.com/150',
            attended: false,
        },
        {
            id: 2,
            name: 'Talha Satti',
            image: 'https://via.placeholder.com/150',
            attended: false,
        },
        {
            id: 3,
            name: 'Anas Khan',
            image: 'https://via.placeholder.com/150',
            attended: false,
        },
        {
            id: 4,
            name: 'Saad',
            image: 'https://via.placeholder.com/150',
            attended: false,
        },
        {
            id: 5,
            name: 'Saad',
            image: 'https://via.placeholder.com/150',
            attended: false,
        },
        {
            id: 6,
            name: 'Saad',
            image: 'https://via.placeholder.com/150',
            attended: false,
        },
        {
            id: 7,
            name: 'Saad',
            image: 'https://via.placeholder.com/150',
            attended: false,
        },
        {
            id: 8,
            name: 'Saad',
            image: 'https://via.placeholder.com/150',
            attended: false,
        },
        {
            id: 9,
            name: 'Saad',
            image: 'https://via.placeholder.com/150',
            attended: false,
        },
        {
            id: 10,
            name: 'Saad',
            image: 'https://via.placeholder.com/150',
            attended: false,
        },
    ]);

    const [presentEmployees, setPresentEmployees] = useState([]);

    const handleAttendClick = (personId) => {
        setPersons((prevPersons) =>
            prevPersons.map((person) => {
                if (person?.id === personId) {
                    const updatedPerson = { ...person, attended: !person.attended };
                    if (updatedPerson.attended) {
                        setPresentEmployees((prevEmployees) => [...prevEmployees, updatedPerson]);
                    } else {
                        setPresentEmployees((prevEmployees) =>
                            prevEmployees.filter((employee) => employee?.id !== updatedPerson?.id)
                        );
                    }
                    return updatedPerson;
                }
                return person;
            })
        );
    };

    const slickSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: '10px',
        focusOnSelect: true,
        draggable: true,
        autoplay: true,
        autoplaySpeed: 5000,
        cssEase: 'linear',
    };

    return (
        <CarouselContainer>
            <Slider {...slickSettings}>
                {persons.map((person) => (
                    <div key={person.id}>
                        {person.attended ? (
                            <CarouselCenterSlide>
                                {/* Selected (center) card */}
                                <Card>
                                    <CardMedia
                                        component="img"
                                        alt={person.name}
                                        height="150"
                                        image={person.image}
                                    />
                                    <CardContent>
                                        <div>{person.name}</div>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            onClick={() => handleAttendClick(person.id)}
                                        >
                                            Mark Absent
                                        </Button>
                                    </CardContent>
                                </Card>
                            </CarouselCenterSlide>
                        ) : (
                            <CarouselSlide>
                                {/* Surrounding cards */}
                                <Card>
                                    <CardMedia
                                        component="img"
                                        alt={person.name}
                                        height="150"
                                        image={person.image}
                                    />
                                    <CardContent>
                                        <div>{person.name}</div>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => handleAttendClick(person.id)}
                                        >
                                            Mark Present
                                        </Button>
                                    </CardContent>
                                </Card>
                            </CarouselSlide>
                        )}
                    </div>
                ))}
            </Slider>
        </CarouselContainer>
    );
};
export default Attendence;
