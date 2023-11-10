import styled from "styled-components";
import { Col, Row } from 'antd';


export const StyledGraphRow = styled(Row)`
display: flex;
align-items: center;
justify-content: space-between;
`;

export const StyledUserColumn = styled(Col)`
display: flex;
align-items: center;
justify-content: center;
margin-left: 10px;
height: 200px;
background-color: #F1EB90;
border-radius: 5px;
box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
`;

export const StyledGraphColumn = styled(Col)`
margin-left: 10px;
border-radius: 5px;
box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
`;

export const StyledDetailsRow = styled(Row)`
  background: #fafafa;
  margin-top: 20px;
`;
