import { Card } from "antd";
import styled from "styled-components";





export const InnerCard = styled(Card)`
   margin: 30px;
   border-radius: 10px;
   display: flex;
   flex-direction: column;
   align-items: center; 
   justify-content: center;
   overflow: 'hidden';
border: 1px solid #0C356A;
    &:hover {
        transform: scale(1.04);
        color: white;
        transition: 0.4s;
        background: #0C356A;
        color: '#fff';
        box-shadow: 31px 4px 67px -30px rgba(0,0,0,0.75);
    }
`;


export const ImageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 10px;
   
`;





