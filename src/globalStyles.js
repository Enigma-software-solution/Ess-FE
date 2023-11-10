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


::-webkit-scrollbar {
      width: 6px;
    }

    ::-webkit-scrollbar-track {
      background: #f1f1f1;
    }

    ::-webkit-scrollbar-thumb {
      background-color: #d8dee8;
      border-radius: 6px;
    }

    /* Firefox */
    scrollbar-width: thin;
    scrollbar-color: #888 #f1f1f1;
`;

export default GlobalStyles;
