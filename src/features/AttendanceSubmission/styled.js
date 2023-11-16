import { Card } from "antd";
import styled from "styled-components";

export const InnerCard = styled(Card)`
  margin: 30px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: "hidden";
  border: 1px solid #0c356a;
  &:hover {
    transform: scale(1.04);
    transition: 0.4s;
    border: 2px solid white;
    box-shadow: 31px 4px 67px -30px rgba(0, 0, 0, 0.75);
  }
`;

export const ImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 10px 10px 50px 10px;
`;

export const SubmitButton = styled.button`
  border-radius: 10px;
  border: none;
  height: 40px;
  color: white;
  background: #001861;
  box-shadow: 7px 9px 10px 0px rgba(0, 0, 0, 0.32);
  &:hover {
    background: black;
    color: white;
  }
`;

export const SearchInput = styled.input`
  width: 50%;
  margin: 30px;
  height: 40px;
  padding: 10px;
  border-radius: 20px;
  box-shadow: 7px 9px 10px 0px rgba(0, 0, 0, 0.18);
`;
export const SearchWrapper = styled.div`
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const CardWrapper = styled.div`
  margin-bottom: 40px;
`;
export const CardImage = styled.img`
  border-radius: 50%;
  box-shadow: -4px -4px 119px -16px rgba(0, 0, 0, 0.75);
`;

export const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
`;
