import { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";

export const GlobalStyle = createGlobalStyle`
*,
*::before,
*::after {
  box-sizing: border-box;
}

#__next,
html,
body {
  margin:0;
  padding:0;
  width: 100%;
  height: 100%;
  font-family: Noto Sans, Noto Sans Kr, "Sans-serif";
  background-color: #f2f2f2;
  user-select: none;
}
`;
