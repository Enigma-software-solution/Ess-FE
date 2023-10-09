import React, { useState, useEffect } from 'react';
import { Layout, Button, Modal } from 'antd';
import Webcam from 'react-webcam';
import styled from 'styled-components';
import * as faceapi from 'face-api.js';
import meImage from 'src/assets/test.jpg';
// import meImage from 'src/assets/ik.png';Z

const { Content } = Layout;

const StyledContent = styled(Content)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const App = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [faceApiLoaded, setFaceApiLoaded] = useState(false);

  useEffect(() => {
    // Load face-api.js models
    const loadModels = async () => {
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
        faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
        faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
        faceapi.nets.ssdMobilenetv1.loadFromUri('/models'), // Load SsdMobilenetv1 model
      ]);
      setFaceApiLoaded(true);
    };

    loadModels();
  }, []);

  const handleCapture = async () => {
    if (
      !faceapi.nets.tinyFaceDetector.isLoaded ||
      !faceapi.nets.faceLandmark68Net.isLoaded ||
      !faceapi.nets.faceRecognitionNet.isLoaded ||
      !faceapi.nets.ssdMobilenetv1.isLoaded ||
      !faceApiLoaded
    ) {
      console.error('Face-api.js models not loaded yet.');
      return;
    }

    const imageSrc = webcamRef.current.getScreenshot();
    const inputImage = await faceapi.fetchImage(imageSrc);

    // Perform face detection
    const detections = await faceapi
      .detectAllFaces(inputImage, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceDescriptors();

    // Load reference image
    const meImageEl = await faceapi.fetchImage(meImage);

    // Find face descriptor for the reference image
    const meFaceDescriptor = await faceapi
      .detectSingleFace(meImageEl)
      .withFaceLandmarks()
      .withFaceDescriptor();

    // Compare the detected faces with the reference image
    if (detections.length > 0) {
        const match = faceapi.euclideanDistance(
            meFaceDescriptor.descriptor,
            detections[0].descriptor
          );
          
          if (match < 0.4) {
            // Face detected and matched with the reference image, mark attendance
            setIsModalVisible(true);
          } else {
            // Face detected but not matched with the reference image
            console.log('Face detected, but not matched.');
          }
        }
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const webcamRef = React.useRef(null);

  return (
    <Layout>
      <StyledContent>
        <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
      </StyledContent>
      <StyledContent>
        <Button type="primary" onClick={handleCapture}>
          Capture Attendance
        </Button>
      </StyledContent>
      <Modal
        title="Attendance Captured"
        open={isModalVisible}
        onOk={handleCloseModal}
        onCancel={handleCloseModal}
      >
        Attendance recorded successfully!
      </Modal>
    </Layout>
  );
};

export default App;
