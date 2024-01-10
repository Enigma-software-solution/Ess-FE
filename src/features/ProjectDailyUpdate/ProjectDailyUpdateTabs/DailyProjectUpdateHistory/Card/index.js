import React, { useState, useEffect } from 'react';
import { Form, Flex, Spin } from 'antd'; // Import Spin for loader
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { format } from 'date-fns';
import { Pagination } from 'swiper/modules';
import { CardWrapper } from './styled';
import TextArea from 'antd/es/input/TextArea';

const ProjectUpdateCard = ({ dataSource }) => {
    const [loading, setLoading] = useState(true); // State for loading

    const stripHtmlTags = (htmlString) => {
        if (!htmlString) {
            return "";
        }
        const doc = new DOMParser().parseFromString(htmlString, 'text/html');
        return doc.body.textContent || "";
    };

    useEffect(() => {
        if (dataSource) {
            setLoading(false); 
        }
    }, [dataSource]);

    return (
        <Flex justify='center'>
            {loading ? ( 
                <Spin size="large" />
            ) : (
                <Swiper
                    pagination={{ clickable: true }}
                    modules={[Pagination]}
                    slidesPerView={4}
                    grabCursor={true}
                    spaceBetween={10}
                    style={{ padding: '30px', marginBottom: '40px' }}
                >
                    {dataSource.map((records) => (
                        <SwiperSlide key={records.project?.clientId}>
                            <CardWrapper>
                                <Flex style={{ fontSize: '18px', fontWeight: '500' }}>
                                    {records.project?.clientName || 'No client name'}
                                </Flex>
                                <hr />
                                <h6 className='text-center pb-2'>
                                    {records.project?.projectManager?.first_name} {records.project?.projectManager?.last_name || 'No project manager'}
                                </h6>
                                <Form initialValues={{ content: stripHtmlTags(records?.content) }}>
                                    <Form.Item name='content' rules={[{ required: true, message: 'Please enter an update.' }]}>
                                        <TextArea rows={7} placeholder='Update' readOnly="true" />
                                    </Form.Item>
                                    <Flex align='center' justify='end' className='mb-0'>
                                        <Form.Item name="date">
                                            {format(new Date(records?.date), 'MM/dd/yyyy')}
                                        </Form.Item>
                                    </Flex>
                                </Form>
                            </CardWrapper>
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
        </Flex>
    );
};

export default ProjectUpdateCard;
