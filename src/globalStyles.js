import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
*{
  padding:0;
  margin:0;
  box-sizing: border-box;
}

  body {
    background-color: ${(props) => props.theme.colors.background};
    color: ${(props) => props.theme.colors.text};
    font-family:sans-serif, 'Helvetica Neue', Helvetica, Arial, ;
    font-size: 16px;
  }
`;

export default GlobalStyles;
