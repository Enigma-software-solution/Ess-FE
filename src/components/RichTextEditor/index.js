import React, { useState } from 'react';
import ReactQuill from 'react-quill';

const RichTextEditor = ({ value, onChange }) => {
  const [editorHtml, setEditorHtml] = useState(value);

  const handleEditorChange = (content, _, __, editor) => {
    setEditorHtml(content);
    if (onChange) {
      onChange(content, editor);
    }
  };

  return (
    <ReactQuill
      style={{ height: '200px' }}
      theme="snow"
      value={editorHtml}
      onChange={handleEditorChange}
    />
  );
};

export default RichTextEditor;
