import { Card } from "antd";
import styled from "styled-components";

export const CardWrapper = styled(Card)`
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 4px 2px 20px -7px  rgba(0,0,0,0.2);
  transition: all.5s;

  &:hover {
    cursor: pointer;
    box-shadow: 4px 2px 20px -7px  rgba(0,0,0,0.7);
  }
`;


export const CardImage = styled.img`
height: 100px;
width: 100px;
border-radius: 50%;
`;