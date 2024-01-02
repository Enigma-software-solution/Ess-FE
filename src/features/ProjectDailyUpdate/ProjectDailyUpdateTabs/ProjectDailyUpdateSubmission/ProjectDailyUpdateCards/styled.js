import { Card } from "antd";
import styled from "styled-components";

export const CardWrapper = styled(Card)`
  width: 100%;
  border-radius: 2%;
  overflow: hidden;
  box-shadow: 4px 2px 10px -7px rgba(0, 0, 0, 0.6);
  transition: box-shadow 0.3s ease-in-out;
  height: 350px;

  &:hover {
    cursor: pointer;
    box-shadow: 4px 2px 20px -7px rgba(0, 0, 0, 0.8);
  }
`;

