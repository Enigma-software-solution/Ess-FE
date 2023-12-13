import styled from "styled-components";
import { Card } from "antd";

export const StyledCard = styled(Card)`
  width: 100%;
  height: 200px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  border-radius:10px;
  background: #fff;
  box-shadow: 4px 2px 20px -7px  rgba(0,0,0,0.2);
 

  .user_avatar {
    background-color: ${(props) => props.theme.token.colorPrimary};
    position: absolute;
    top: -26px;
    left: -26px;
    width: 90px;
    height: 90px;
    border-radius: 50%;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    padding: 0px 20px 14px 0;

    p {
      font-size: 28px;
      font-weight: bold;
      color: white;
    }
  }

  .user_info {
    margin-left: 50px;
    
    span {
      font-size: 20px;
      font-weight: 700;
      color: #071952;
    }

    p {
      font-size: 16px;
      color: #352F44;
      margin-top: 10px;
    }
  }
`;
