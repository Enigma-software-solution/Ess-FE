import { Flex } from "antd";
import styled from "styled-components";

export const Wrapper = styled(Flex)`
  background-color: #F5F5F5;
  height: 100vh;
  padding: 30px;
  line-height: 50px;
  justify-content: center;
  border-right: 1px solid #F9F5EB;
  h5 {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 150px;
  color: grey;
  cursor: pointer;
  line-height: 50px;
  font-size: medium;
}

h5:hover {
  color: #0c59db;
}

    line-height: 50px;
    font-size: medium;
  
  .selected {
    color: #0c59db;
  }
  button {
    text-align: center;
    padding-left: 5px;
  }
`;
