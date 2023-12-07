import { Flex } from "antd";
import styled from "styled-components";

export const Wrapper = styled(Flex)`
  background-color: #F5F5F5;
  height: 100vh;
  padding: 30px;
  line-height: 50px;
  justify-content: center;
  position: fixed;
  border-right: 1px solid #F9F5EB;
  h5 {
    color: grey;
    cursor: pointer;
    &:hover {
      color: #0c59db;
    }
    line-height: 50px;
    font-size: medium;
  }
  .selected {
    color: #0c59db;
  }
  button {
    text-align: center;
    padding-left: 5px;
  }
`;
