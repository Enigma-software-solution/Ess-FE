import React, { useEffect, useState } from "react";
import { Button, Drawer, Space } from "antd";
import { FullscreenExitOutlined, FullscreenOutlined } from "@ant-design/icons";
import ReactQuill from "react-quill";
import { useDispatch, useSelector } from "react-redux";
import { updateEventNotes } from "src/store/slices/agenda/apis";
import { getSelectEvent } from "src/store/slices/agenda/selector";

const NotesDrawer = ({ handleDrawerClose, isDrawerOpen }) => {


  const [isFullScreen, setIsFullScreen] = useState(false);
  const [value, setValue] = useState('');

  const selectedEvent=useSelector(getSelectEvent)

  const dispatch = useDispatch()

  const handleSave = async() => {
    
     const data={
        eventId:selectedEvent._id,
        notes:value
      }
    
      try {
       await dispatch(updateEventNotes(data))
       setValue('')
        handleDrawerClose()
      }
      catch(err){
        console.log(err)
      }
  
  };


  useEffect(() => {
    setValue(selectedEvent?.notes)
  }, [selectedEvent])
  

  const toolbarOptions = [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }],
    ["link", "image", "code", "color"],
    ["clean"],
  ];

  return (
    <div>
      <Drawer
        placement="right"
        closable={true}
        onClose={handleDrawerClose}
        open={isDrawerOpen}
        width={isFullScreen ? "85%" : "45%"}
        extra={
          <Space>
            <Button onClick={handleSave} type="primary">
              Save
            </Button>

            <Button
              onClick={() => setIsFullScreen(!isFullScreen)}
              className="d-flex justify-center align-items-center"
            >
              {isFullScreen ? (
                <FullscreenExitOutlined />
              ) : (
                <FullscreenOutlined />
              )}
            </Button>
          </Space>
        }
      >
        <ReactQuill
          modules={{
            toolbar: toolbarOptions,
          }}
          theme="snow"
          value={value}
          onChange={setValue}
        />
      </Drawer>
    </div>
  );
};

export default NotesDrawer;