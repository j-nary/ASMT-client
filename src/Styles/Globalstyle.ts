import { createGlobalStyle } from "styled-components";
export default createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}
/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
    display: none;
}
body {
  line-height: 1;
}
menu, ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
* {
  box-sizing: border-box;
}
body {
  /* font-family: 'Source Sans 3', sans-serif; */
  /* font-family: 'Black Han Sans', sans-serif; */
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props: any) => props.theme.textColor};
  font-size: 1rem;
  font-family: var(--font-jjwfont), var(--font-jjwfont2);
}
a {
  text-decoration: none;
  color: inherit;
}
`;
