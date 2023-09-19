import styled from 'styled-components';
import { Menu, Layout, Button } from 'antd';


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

