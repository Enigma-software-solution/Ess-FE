import React, { useEffect, useState } from "react";
import { Button, Drawer, Space } from "antd";
import { FullscreenExitOutlined, FullscreenOutlined } from "@ant-design/icons";
import ReactQuill from "react-quill";
import { useDispatch, useSelector } from "react-redux";
import { updateEventNotes } from "src/store/slices/agendaSlice/apis";
import {
  checkNotesDrawer,
  getSelectedEvent,
} from "src/store/slices/agendaSlice/selector";
import { closeNotesDrawer } from "src/store/slices/agendaSlice";

const NotesDrawer = ({ isDrawerOpen, handleDrawerClose }) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [value, setValue] = useState("");
  const [editorInitialized, setEditorInitialized] = useState(false);

  const selectedEvent = useSelector(getSelectedEvent);
  const dispatch = useDispatch();
  const isDrawer = useSelector(checkNotesDrawer);

  const handleClose = () => {
    dispatch(closeNotesDrawer());
  };

  const handleSave = async () => {
    const data = {
      eventId: selectedEvent._id,
      notes: value === "<p><br></p>" ? null : value,
    };

    try {
      await dispatch(updateEventNotes(data));
      handleClose();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (selectedEvent?.notes) {
      setValue(selectedEvent.notes);
    } else {
      setValue("");
    }
  }, [selectedEvent]);

  useEffect(() => {

    if (isDrawerOpen && !editorInitialized) {

      setTimeout(() => {
        setEditorInitialized(true);
      }, 100);
    }
  }, [isDrawerOpen, editorInitialized]);

  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"],
    ["blockquote", "code-block"],
    [{ header: 1 }, { header: 2 }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ direction: "rtl" }],
    [{ size: ["small", false, "large", "huge"] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
    ["clean"],
  ];

  return (
    <Drawer
      title="Notes"
      placement="right"
      onClose={handleClose}
      visible={isDrawer}
      width={isFullScreen ? "85%" : "45%"}
      footer={
        <Space>
          <Button key="save" type="primary" onClick={handleSave}>
            Save
          </Button>
        </Space>
      }
      extra={
        <Button
          onClick={() => setIsFullScreen(!isFullScreen)}
          className="d-flex justify-center align-items-center"
        >
          {isFullScreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
        </Button>
      }
    >
      {isDrawerOpen && editorInitialized && (
        <ReactQuill
          modules={{
            toolbar: toolbarOptions,
          }}
          theme="snow"
          value={value}
          onChange={setValue}
        />
      )}
    </Drawer>
  );
};

export default NotesDrawer;
