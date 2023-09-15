import styled from "styled-components";

export const StyledDetailsDiv = styled.div`
  color: #ffffff; 
  background-color: #E5D283;
  border-radius: 20px;
  padding: 20px;
  width: 400px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s, transform 0.3s;

  &:hover {
    background-color: #FFCC70;
    transform: scale(1.05); 
  }
`;
