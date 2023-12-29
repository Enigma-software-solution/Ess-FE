import { Flex, Popconfirm, } from 'antd';
import format from 'date-fns/format';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DeleteButton from 'src/components/buttons/DeleteButton';
import EditButton from 'src/components/buttons/EditButton';
import { createDailyProjectUpdateApi, deteleDailyProjectUpdatesApi, getDailyProjectUpdateApi, updateDailyUpdate } from 'src/store/slices/projectDailyUpdates/apis';
import { getAllProjectDailyUpdates, getSelectedProjectDailyUpdates, getmodalVisible } from 'src/store/slices/projectDailyUpdates/selectors';
import qs from 'qs';
import { getLogedInUser } from 'src/store/slices/authSlice/selectors';
import { useForm } from 'antd/es/form/Form';
import Form from 'antd/es/form/Form';
import { CardWrapper } from './styled';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from "swiper/modules";
import { setModalVisible, setSelectedProjectDailyUpdate } from 'src/store/slices/projectDailyUpdates';
import AddProjectDailyUpdateModal from '../AddProjectUpdateModal';



const ProjectDailyUpdateCards = () => {
    const dispatch = useDispatch();

    const authUser = useSelector(getLogedInUser);
    const todayAllUpdates = useSelector(getAllProjectDailyUpdates);
    const selectedProject = useSelector(getSelectedProjectDailyUpdates)
    const [form] = useForm();
    const modalVisible = useSelector(getmodalVisible)

    const handleConfirmDelete = (recordToDelete, e) => {
        dispatch(deteleDailyProjectUpdatesApi(recordToDelete?._id));
    };


    const handleClick = (record, e) => {
        dispatch(setSelectedProjectDailyUpdate(record));
        dispatch(setModalVisible(true));
    };



    useEffect(() => {
        const params = qs.stringify({
            date: new Date(),
            user: authUser?.id,
        });
        dispatch(getDailyProjectUpdateApi(params));
    }, []);


    const stripHtmlTags = (htmlString) => {
        if (!htmlString) {
            return "";
        }
        const doc = new DOMParser().parseFromString(htmlString, 'text/html');
        return doc.body.textContent || "";
    };






    return (
        <>


            <Swiper
                pagination={{ clickable: true }}
                modules={[Pagination]}
                slidesPerView={4}
                spaceBetween={10}
                grabCursor={true}
                style={{ padding: '30px', marginBottom: '40px' }}
            >
                {todayAllUpdates?.dailyUpdates?.map((record) => (
                    <SwiperSlide>
                        <CardWrapper>

                            <Flex justify='space-between'>
                                <div style={{ fontSize: '18px', fontWeight: '500' }}>
                                    {record.project?.clientName || 'No client name'}
                                </div>
                                <div className='d-flex gap-1'>
                                    <EditButton onClick={(e) => handleClick(record, e)} />
                                    <Popconfirm
                                        title="Are you sure to delete this client?"
                                        onConfirm={(e) => handleConfirmDelete(record, e)}
                                        onCancel={(e) => e.stopPropagation()}
                                        okText="Yes"
                                        cancelText="No"
                                    >
                                        <DeleteButton onClick={(e) => e.stopPropagation()}>Delete</DeleteButton>
                                    </Popconfirm>
                                </div>
                            </Flex>
                            <hr />




                            <h6 className="text-center pb-2">
                                {record.project?.projectManager?.first_name} {record.project?.projectManager?.last_name || 'No project manager'}
                            </h6>
                            <Form form={form} initialValues={{ content: stripHtmlTags(record?.content) }}>
                                <Form.Item name="Update">
                                    <label htmlFor="updateTextArea" style={{ fontWeight: '500' }}>Update</label>
                                    <div dangerouslySetInnerHTML={{ __html: record?.content }} />
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

            {modalVisible && <AddProjectDailyUpdateModal open={modalVisible} handleClose={() => dispatch(setModalVisible(false))} selectedProject={selectedProject} />}

        </>
    );
};

export default ProjectDailyUpdateCards;
