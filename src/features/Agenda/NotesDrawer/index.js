import React, { useEffect, useState } from "react";
import { Button, Drawer, Flex, Select, Space } from "antd";
import { FullscreenExitOutlined, FullscreenOutlined } from "@ant-design/icons";
import ReactQuill from "react-quill";
import { useDispatch, useSelector } from "react-redux";
import { updateEventNotes } from "src/store/slices/agendaSlice/apis";
import { checkNotesDrawer, getSelectedEvent } from "src/store/slices/agendaSlice/selector";
import { closeNotesDrawer } from "src/store/slices/agendaSlice";
import { CallLeads, CallStatus } from "src/constant/callTypes";


const NotesDrawer = ({ isDrawerOpen, handleDrawerClose }) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [value, setValue] = useState(null);
  const [editorInitialized, setEditorInitialized] = useState(false);
  const selectedEvent = useSelector(getSelectedEvent);
  const dispatch = useDispatch();
  const isDrawer = useSelector(checkNotesDrawer);
  const [selectedValues, setSelectedValues] = useState({
    callStatus: null,
    callLeads: null,
  });

  const onClose = () => {
    dispatch(closeNotesDrawer());
  };

  const handleSave = async () => {
    const data = {
      eventId: selectedEvent._id,
      notes: value === '<p><br></p>' ? null : value,
      callStatus: selectedValues.callStatus,
      callLeads: selectedValues.callLeads,
    };

    try {
      await dispatch(updateEventNotes(data));
      onClose();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (selectedEvent?.notes) {
      setValue(selectedEvent?.notes);
    }

    if (selectedEvent) {
      setSelectedValues({
        callStatus: selectedEvent.callStatus,
        callLeads: selectedEvent.callLeads,
      });
    } else {
      setSelectedValues({
        callStatus: null,
        callLeads: null,
      });
    }
  }, [selectedEvent]);

  useEffect(() => {
    if (selectedEvent?.notes) {
      setValue(selectedEvent?.notes);
    } else {

      setValue(null);
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

  const handleStatusChange = (value) => {
    setSelectedValues((prevValues) => ({ ...prevValues, callStatus: value }));
  };

  const handleLeadsChange = (value) => {
    setSelectedValues((prevValues) => ({ ...prevValues, callLeads: value }));
  };
  return (
    <Drawer
      title="Notes"
      placement="right"
      onClose={onClose}
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
      <Flex gap="10px" className="mb-3">
        <Select
          name="callStatus"
          placeholder="Select Status"
          style={{ minWidth: '120px', width: '250px' }}
          onChange={handleStatusChange}
          value={selectedValues.callStatus}
        >
          {CallStatus.map((option) => (
            <Select.Option key={option.value} value={option.value}>
              {option.label}
            </Select.Option>
          ))}
        </Select>

        <Select
          name="callLeads"
          placeholder="Select Leads"
          style={{ minWidth: '120px', width: '250px' }}
          onChange={handleLeadsChange}
          value={selectedValues.callLeads}
        >
          {CallLeads.map((option) => (
            <Select.Option key={option.value} value={option.value}>
              {option.label}
            </Select.Option>
          ))}
        </Select>
      </Flex>
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
