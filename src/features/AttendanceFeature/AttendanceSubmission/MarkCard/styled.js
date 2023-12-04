import { Card } from "antd";
import styled from "styled-components";

export const CardWrapper = styled(Card)`
  margin: 30px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: "hidden";
  &:hover {
   cursor: 'pointer';
    box-shadow: 4px 2px 20px -7px  rgba(0,0,0,0.2);
  }
`;


export const CardImage = styled.img`
height: 100px;
width: 100px;
border-radius: 50%;
`;