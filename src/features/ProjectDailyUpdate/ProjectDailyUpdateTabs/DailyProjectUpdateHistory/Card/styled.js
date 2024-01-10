import { Card } from "antd";
import styled from "styled-components";

export const CardWrapper = styled(Card)`
  width: 100%;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 4px 2px 20px -7px  rgba(0,0,0,0.5);
  transition: box-shadow 0.3s ease-in-out;
  min-height:320px;
  background-color:  #fafafa;
  padding: 5px;

  &:hover {
    cursor: pointer;
    box-shadow: 4px 2px 20px -7px  rgba(0,0,0,0.4);
    background-color: white;
  }
`;


