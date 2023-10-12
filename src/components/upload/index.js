// import React, { useState } from 'react';
// import { Upload, Button, message } from 'antd';
// import { UploadOutlined } from '@ant-design/icons';

// const GenericImageUpload = () => {
//     const [fileList, setFileList] = useState([]);

//     const handleUpload = info => {
//         let fileList = [...info.fileList];

//         // Limit the number of uploaded files
//         fileList = fileList.slice(-1);

//         // Display a message when the file exceeds size limit
//         fileList = fileList.map(file => {
//             if (file.size > 5 * 1024 * 1024) {
//                 message.error(`${file.name} is larger than 5MB!`);
//             }
//             return file;
//         });

//         setFileList(fileList);
//     };

//     const customRequest = ({ onSuccess, onError, file }) => {
//         // You can customize the file upload logic here
//         // For example, you can use Axios to send the file to your server

//         // Simulating a successful upload
//         setTimeout(() => {
//             onSuccess();
//         }, 1000);
//     };

//     const beforeUpload = file => {
//         // You can add custom validation logic here
//         // For example, checking the file type or size

//         // Returning false will stop the upload process
//         return true;
//     };

//     return (
//         <Upload
//             listType='picture-circle'
//             customRequest={customRequest}
//             showUploadList={{ showPreviewIcon: true, showRemoveIcon: true }}
//             // fileList={fileList}
//             beforeUpload={beforeUpload}
//             onChange={handleUpload}
//         >
//             <Button icon={<UploadOutlined />}>Upload Image</Button>
//         </Upload>
//     );
// };

// export default GenericImageUpload;
