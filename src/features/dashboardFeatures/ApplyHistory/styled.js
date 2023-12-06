import { Card } from "antd";
import styled from "styled-components";


 export const PendingUsersCard = styled(Card)`
  width: 300px;
  height: 350px;
  overflow: auto;
  box-shadow: 0px 2px 8px 0px rgba(99, 99, 99, 0.2);
  
  .ant-card-head-title {
    text-align: center;
    color: white;

  }
  .ant-card-head{
background: #001529;
    
  }

  h6, p {
    margin: 0;
    padding: 0;
  }

`;
