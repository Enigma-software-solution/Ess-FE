import React from 'react';
import {Form, Flex, } from 'antd';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { format } from 'date-fns';
import { Pagination } from 'swiper/modules';
import { CardWrapper } from './styled';
import TextArea from 'antd/es/input/TextArea';

const ProjectUpdateCard = ({ record }) => {
    const stripHtmlTags = (htmlString) => {
        if (!htmlString) {
            return "";
        }
        const doc = new DOMParser().parseFromString(htmlString, 'text/html');
        return doc.body.textContent || "";
    };
    return (
        <Flex justify='center'>

            <Swiper
                pagination={{ clickable: true }}
                modules={[Pagination]}
                slidesPerView={4}
                grabCursor={true}
                spaceBetween={10}
                style={{ padding: '30px', marginBottom: '40px' }}
            >
                {record.map((record) => (

                    <SwiperSlide>
                        <CardWrapper>
                            <Flex style={{ fontSize: '18px', fontWeight: '500' }}>
                                 {record.project?.clientName || 'No client name'}
                            </Flex>
                            <hr />
                            <h6 className='text-center pb-2'>
                                {record.project?.projectManager?.first_name} {record.project?.projectManager?.last_name || 'No project manager'}
                            </h6>
                            <Form initialValues={{ content: stripHtmlTags(record?.content) }}>
                                <Form.Item name='content' rules={[{ required: true, message: 'Please enter an update.' }]}>
                                    <TextArea rows={2} placeholder='Update' readOnly="true" />
                                </Form.Item>
                                <Flex align='center' justify='end' className='mb-0'>
                                    <Form.Item name="date">
                                        {format(new Date(record?.date), 'MM/dd/yyyy')}
                                    </Form.Item>
                                </Flex>
                            </Form>
                        </CardWrapper>
                    </SwiperSlide>
                ))}
            </Swiper>

        </Flex>
    );
};

export default ProjectUpdateCard;
