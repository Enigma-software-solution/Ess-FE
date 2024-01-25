import { Card } from "antd";
import styled from "styled-components";

export const CardWrapper = styled(Card)`
  width: 100%;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 4px 2px 10px -7px rgba(0, 0, 0, 0.5);
  transition: box-shadow 0.3s ease-in-out;
  height: 400px;
  background-color:  #fafafa;

  &:hover {
    cursor: pointer;
    box-shadow: 0 0px 8px gray;
  }



`;

