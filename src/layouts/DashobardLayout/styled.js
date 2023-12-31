import styled from "styled-components";
import { Layout } from "antd";

const { Sider, Header, Content } = Layout;

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
  background: #f1f2f3;
  height: 48px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const StyledContent = styled(Content)`
  padding: 20px;
  overflow: scroll;
  height: calc(100vh - 50px);
  &::-webkit-scrollbar {
    width: 0.5em;
  }
`;
