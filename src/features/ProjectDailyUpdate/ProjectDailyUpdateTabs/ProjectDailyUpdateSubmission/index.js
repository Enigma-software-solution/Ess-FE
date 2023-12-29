import React, { useState } from 'react'
import AddProjectDailyUpdateModal from './AddProjectUpdateModal'
import ViewDailyProjectUpdateTable from './ViewDailyProjetUpdateTable'
import ProjectDailyUpdateCards from './ProjectDailyUpdateCards'
import { Button } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { setModalVisible } from 'src/store/slices/projectDailyUpdates'
import { getSelectedProjectDailyUpdates, getmodalVisible } from 'src/store/slices/projectDailyUpdates/selectors'

const ProjectDailyUpdateSubmission = () => {
    const dispatch = useDispatch();
    const modalVisible = useSelector(getmodalVisible)
    const selectedProject = useSelector(getSelectedProjectDailyUpdates)
    const showModal = () => {
        dispatch(setModalVisible(true));
    };

    return (
        <>
            <Button onClick={showModal} type="primary">
                ADD PROJECT UPDATE
            </Button>
            {modalVisible && <AddProjectDailyUpdateModal open={modalVisible} handleClose={() => dispatch(setModalVisible(false))} selectedProject={selectedProject} />}
            {/* <AddProjectDailyUpdateModal /> */}
            <ProjectDailyUpdateCards />
            <ViewDailyProjectUpdateTable />
        </>
    )
}

export default ProjectDailyUpdateSubmission