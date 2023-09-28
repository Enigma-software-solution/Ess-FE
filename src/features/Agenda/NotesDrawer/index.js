import React, { useEffect, useState } from "react";
import { Button, Drawer, Space } from "antd";
import { FullscreenExitOutlined, FullscreenOutlined } from "@ant-design/icons";
import ReactQuill from "react-quill";
import { useDispatch, useSelector } from "react-redux";
import { updateEventNotes } from "src/store/slices/agendaSlice/apis";
import {
  checkNotesDrawer,
  getSelectEvent,
} from "src/store/slices/agendaSlice/selector";
import { closeNotesDrawer } from "src/store/slices/agendaSlice";

const NotesDrawer = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [value, setValue] = useState(null);

  const selectedEvent = useSelector(getSelectEvent);
console.log(value,'notes value')
  const dispatch = useDispatch();
  const isDrawer = useSelector(checkNotesDrawer);

  const onClose = () => {
    dispatch(closeNotesDrawer());
  };

  const handleSave = async () => {
    const data = {
      eventId: selectedEvent._id,
      notes: value === '<p><br></p>' ? null : value,
    };

    try {
      await dispatch(updateEventNotes(data));
      onClose();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (selectedEvent) {
      setValue(selectedEvent?.notes);
    }
  }, [selectedEvent]);

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
    <div>
      <Drawer
        placement="right"
        closable={true}
        onClose={onClose}
        open={isDrawer}
        width={isFullScreen ? "85%" : "45%"}
        destroyOnClose
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
