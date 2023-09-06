import styled from "styled-components";
import { Layout } from "antd";

const { Sider,Header,Content } = Layout;

export const StyledSider = styled(Sider)`
  overflow: auto;
  height: 100vh;
  position: sticky;
  top: 0;
  left: 0;
`;


export const StyledHeader = styled(Header)`
  position: sticky;
  top: 0;
  z-index: 2;
`;

export const StyledContent = styled(Content)`
padding: 20px;
margin: 24px 16px 0;
 overflow: scroll;
 height: calc(100vh - 200px);
 &::-webkit-scrollbar {
    width: 0.5em; /* Adjust the width as needed */
  }
`;
