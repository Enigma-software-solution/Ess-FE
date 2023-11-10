import { Button, Typography } from "antd";
import styled from "styled-components";

export const StyledBox = styled('div')`
  background: #fafafa;
  border-radius: 8px;
  margin-top: 50px;
`;

export const StyledHeading = styled(Typography)`
  padding: 20px;
  font-size: medium;
  font-weight: 600;
  color: #545d69;
`;

export const StyledButton = styled(Button)`
  background-color: #3498db;
  color: #fff;
  border-radius: 100px;
  padding: 10px 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: background-color 0.3s; 

`;
