import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
*{
  padding:0;
  margin:0;
  box-sizing: border-box;
  font-family: 'Roboto', sans-serif;
}

h1,h2,h3,h4,h5,p,span {
  padding: 0;
  margin: 0;
}

  body {
    background-color: ${(props) => props.theme.token.background};
    color: ${(props) => props.theme.token.text};
    font-size: 16px;
  }

  .rbc-time-slot.rbc-selectable {
  height: 340px !important; /* Change this value to your desired height */
}

.ql-editor{
    min-height:calc(100vh - 200px);
}


.rbc-event{
box-sizing: border-box;
padding: 6px !important;
}
`;

export default GlobalStyles;
