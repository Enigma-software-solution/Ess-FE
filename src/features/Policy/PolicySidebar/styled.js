import styled from "styled-components";

export const Wrapper = styled('div')`
  width: 17%;
  height: 100vh;
  box-shadow: 4px 0 2px -2px rgba(0,0,0,0.1);
  background-color:#fcfcfc;
  position: fixed;


`;


export const PolicyTitleWrapper = styled('div')`
height: calc(100vh - 60px);
overflow: auto;
padding:  5px 20px;
display: flex;
flex-direction: column;


p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 180px;
  color: grey;
  cursor: pointer;
  line-height: 30px;
  font-size: 14px;
  font-weight: 500;
  text-transform: capitalize;


&:hover {
  color: #0c59db;

}
  &.selected {
    color: #0c59db;
  }
  }
`
