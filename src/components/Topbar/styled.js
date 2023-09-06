import { Button } from "antd";
import styled from "styled-components";

export const ToggleButton = styled(Button)`
  width: 38px;
  height: 38px;
  background: #fcfcfc;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  cursor: pointer;
  transition: 0.3s;
  margin-left: -80px;

  &:hover {
    box-shadow: 0px 2px 7px 5px rgba(0, 0, 0, 0.2);
  }

`;