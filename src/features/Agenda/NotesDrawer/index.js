import React, { useState } from "react";
import { Button, Drawer, Space } from "antd";
import { FullscreenExitOutlined, FullscreenOutlined } from "@ant-design/icons";
import ReactQuill from "react-quill";


const NotesDrawer = ({ handleDrawerClose, isDrawerOpen }) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [value, setValue] = useState("");

  const handleSave = () => {};

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
        width={isFullScreen ? '85%' : '50%'}
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
         onChange={setValue} />

      </Drawer>
    </div>
  );
};

export default NotesDrawer;
