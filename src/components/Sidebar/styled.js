import styled from 'styled-components';
import { Menu, Layout, Button } from 'antd';


// export const StyledMenuItem = styled(Menu.Item) `
//   border-right: 3px solid ${(props) => (props.clicked ? '#468B9F' : 'transparent')};
//   background-color: ${(props) => (props.clicked ? 'transparent' : 'initial')};
// `;
// export const StyledSubMenu = styled(Menu.SubMenu)`
//   .ant-menu-item {
//     &:hover {
//       background-color: transparent;
//     }
//   }
// `;



export const SidebarMenu = styled(Menu)`
  background-color: transparent !important;
  .ant-sub-menu-item,
  .ant-menu-item{
    color:white !important
  }
  .ant-menu-item:hover,
  .ant-menu-item-selected { 
    background-color: #468B9F !important;
  }
`

