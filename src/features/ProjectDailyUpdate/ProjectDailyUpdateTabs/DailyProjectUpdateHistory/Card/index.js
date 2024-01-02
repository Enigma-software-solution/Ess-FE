import React from 'react';
import { Card, Form, Flex } from 'antd';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { useForm } from 'antd/es/form/Form';
import { format } from 'date-fns';
import { Pagination } from 'swiper/modules';
import { CardWrapper } from './styled';
import TextArea from 'antd/es/input/TextArea';

const ProjectUpdateCard = ({ record }) => {
    const {form} = useForm();
    const stripHtmlTags = (htmlString) => {
        if (!htmlString) {
            return "";
        }
        const doc = new DOMParser().parseFromString(htmlString, 'text/html');
        return doc.body.textContent || "";
    };
    return (
        <Swiper
            pagination={{ clickable: true }}
            modules={[Pagination]}
            slidesPerView={4}
            spaceBetween={10}
            grabCursor={true}
            style={{ padding: '30px', marginBottom: '40px' }}
        >
                {record.map((record) => (
            <SwiperSlide>
        
                <CardWrapper>

                    <Flex >
                        <div style={{ fontSize: '18px', fontWeight: '500' }}>
                        {record.project?.projectManager?.first_name} {record.project?.projectManager?.last_name || 'No project manager'}
                        </div>
                 
                    </Flex>
                    <hr />

                    <Form initialValues={{ content: stripHtmlTags(record?.content) }}>
                                <Form.Item name='content' rules={[{ required: true, message: 'Please enter an update.' }]}>
                                    <TextArea rows={2} placeholder='Update' readOnly="true"/>
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
    );
};

export default ProjectUpdateCard;
