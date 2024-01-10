import { Button, Flex, Popconfirm } from 'antd';
import format from 'date-fns/format';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DeleteButton from 'src/components/buttons/DeleteButton';
import EditButton from 'src/components/buttons/EditButton';
import { deteleDailyProjectUpdatesApi, getDailyProjectUpdateApi, updateDailyUpdate } from 'src/store/slices/projectDailyUpdates/apis';
import { getAllProjectDailyUpdates, getSelectedProjectDailyUpdates } from 'src/store/slices/projectDailyUpdates/selectors';
import qs from 'qs';
import { getLogedInUser } from 'src/store/slices/authSlice/selectors';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from "swiper/modules";
import { setSelectedProjectDailyUpdate } from 'src/store/slices/projectDailyUpdates';
import TextArea from 'antd/es/input/TextArea';
import { CardWrapper } from './styled';

const ProjectDailyUpdateCards = () => {
    const dispatch = useDispatch();
    const authUser = useSelector(getLogedInUser);
    const todayAllUpdates = useSelector(getAllProjectDailyUpdates);
    const selectedProject = useSelector(getSelectedProjectDailyUpdates);

    const [editedContentMap, setEditedContentMap] = useState({});

    const handleConfirmDelete = (recordToDelete, e) => {
        dispatch(deteleDailyProjectUpdatesApi(recordToDelete?._id));
    };

    const handleClick = (record, e) => {
        dispatch(setSelectedProjectDailyUpdate(record));
    };

    const handleCancelEdit = (record) => {
        dispatch(setSelectedProjectDailyUpdate(null));
    };

    const handleSaveEdit = (record) => {
        const newcontent = editedContentMap[record._id] || '';     
        if (newcontent.trim() !== '') {
            dispatch(updateDailyUpdate({ ...record, content: newcontent }));
        }
    
        setEditedContentMap((prevMap) => ({ ...prevMap, [record._id]: '' })); 
        dispatch(setSelectedProjectDailyUpdate(null));
    };
    

    useEffect(() => {
        const params = qs.stringify({
            date: new Date(),
            user: authUser?.id,
        });
        dispatch(getDailyProjectUpdateApi(params));
    }, [authUser, dispatch]);

    const stripHtmlTags = (htmlString) => {
        if (!htmlString) {
            return '';
        }
        const doc = new DOMParser().parseFromString(htmlString, 'text/html');
        return doc.body.textContent || '';
    };

    const handleTextAreaChange = (recordId, value) => {
        setEditedContentMap((prevMap) => ({...prevMap , [recordId]: value }))
    };
    console.log(editedContentMap,"@edited")

    return (
        <>
            <Swiper
                pagination={{ clickable: true }}
                modules={[Pagination]}
                slidesPerView={4}
                spaceBetween={20}
                grabCursor={true}
                style={{ padding: '30px', marginBottom: '40px' }}
            >
                {todayAllUpdates?.dailyUpdates?.map((record) => (
                    <SwiperSlide key={record._id}>
                        <CardWrapper>
                            <Flex justify='space-between'>
                                <div style={{ fontSize: '18px', fontWeight: '500' }}>
                                    {record.project?.clientName || 'No client name'}
                                </div>
                                <div className='d-flex gap-1'>
                                    <EditButton onClick={(e) => handleClick(record, e)} />
                                    <Popconfirm
                                        title='Are you sure to delete this client?'
                                        onConfirm={(e) => handleConfirmDelete(record, e)}
                                        onCancel={(e) => e.stopPropagation()}
                                        okText='Yes'
                                        cancelText='No'
                                    >
                                        <DeleteButton onClick={(e) => e.stopPropagation()}>Delete</DeleteButton>
                                    </Popconfirm>
                                </div>
                            </Flex>
                            <hr />
                            <h6 className='text-center pb-2'>
                                {record.project?.projectManager?.first_name} {record.project?.projectManager?.last_name || 'No project manager'}
                            </h6>
                            <TextArea
                                rows={7}
                                placeholder='Update'
                                readOnly={selectedProject !== record}
                                defaultValue={editedContentMap[record._id] || stripHtmlTags(record?.content)}
                                onChange={(e) => handleTextAreaChange(record._id, e.target.value)}
                            />
                            {selectedProject === record && (
                                <>
                                    <Flex align='center' justify='start' className='mb-1 mt-2'>
                                        <Button onClick={() => handleSaveEdit(record)} type='primary' size='small'>
                                            Submit
                                        </Button>
                                        <Button onClick={() => handleCancelEdit(record)} type='default' size='small'>
                                            Cancel
                                        </Button>
                                    </Flex>
                                </>
                            )}
                            <Flex align='center' justify='end' className='mt-2'>
                                {format(new Date(record?.date), 'MM/dd/yyyy')}
                            </Flex>
                        </CardWrapper>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
};

export default ProjectDailyUpdateCards;
