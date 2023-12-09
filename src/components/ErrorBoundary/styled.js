// ErrorBoundary.styles.js
import styled from 'styled-components';

export const ErrorBoundaryWrapper = styled.div`
width: 100%;
height: 100vh;
  padding: 50px;
display:flex;
align-items: center;
flex-direction: column;
`;

export const ErrorMessage = styled.p`
  color: #ff4d4f;
  font-size: 18px;
  margin-bottom: 10px;
`;

