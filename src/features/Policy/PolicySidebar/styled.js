import { Flex } from 'antd';
import styled from 'styled-components';

export const Wrapper = styled(Flex)`
    background-color: #fcfcfc;
    height: 100vh;
    padding: 30px;
   line-height: 50px;
justify-content: center;
border-right: 1px solid #F1F1F1 ;
 h5 {
        color:grey;
        cursor: pointer;
        &:hover {
            color: #0C59DB;
        }
        line-height: 50px;
        font-size: medium;
       }
.selected {
        color: #0C59DB;
    }
    button{
        text-align: center;
        padding-left: 5px;
    }`
    ;
