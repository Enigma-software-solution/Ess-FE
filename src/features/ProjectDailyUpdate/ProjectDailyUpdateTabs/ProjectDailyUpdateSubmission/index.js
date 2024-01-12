import React, { useEffect, useState } from 'react';
import AddProjectDailyUpdateModal from './AddProjectUpdateModal';
import ViewDailyProjectUpdateTable from './ViewDailyProjetUpdateTable';
import ProjectDailyUpdateCards from './ProjectDailyUpdateCards';
import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { setModalVisible } from 'src/store/slices/projectDailyUpdates';
import { getAllProjectDailyUpdates, getSelectedProjectDailyUpdates, getmodalVisible } from 'src/store/slices/projectDailyUpdates/selectors';
import { getLogedInUser } from 'src/store/slices/authSlice/selectors';

const ProjectDailyUpdateSubmission = () => {
    const dispatch = useDispatch();
    const modalVisible = useSelector(getmodalVisible);
    const selectedProject = useSelector(getSelectedProjectDailyUpdates);
    const loggedInUser = useSelector(getLogedInUser);
    const todayAllUpdates = useSelector(getAllProjectDailyUpdates);
    const [filteredUpdates,setfilteredUpdates] = useState(null);


    const showModal = () => {
        dispatch(setModalVisible(true));
    };

    useEffect(() => {

            switch (loggedInUser?.role) {
                case "admin":
                    setfilteredUpdates(todayAllUpdates?.dailyUpdates);
                    break;
    
                case "project_manager":
                    setfilteredUpdates(todayAllUpdates?.dailyUpdates?.filter(record => record.project?.projectManager?._id === loggedInUser?.id));
                    break;
    
                default:
                    setfilteredUpdates(todayAllUpdates?.dailyUpdates?.filter(record => record?.user?._id === loggedInUser?.id));
                    break;
            }

    }, [todayAllUpdates, loggedInUser]);
    
useEffect(()=>{
console.log(todayAllUpdates)
},[todayAllUpdates])


    return (
        <>
            <Button onClick={showModal} type="primary">
                ADD PROJECT UPDATE
            </Button>
            {modalVisible && <AddProjectDailyUpdateModal open={modalVisible} handleClose={() => dispatch(setModalVisible(false))} selectedProject={selectedProject} />}
            <ProjectDailyUpdateCards todayAllUpdates={filteredUpdates} />
            <ViewDailyProjectUpdateTable todayAllUpdates={filteredUpdates} />
        </>
    );
};

export default ProjectDailyUpdateSubmission;
