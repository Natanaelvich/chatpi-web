import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  *{
  margin : 0;
  padding : 0;
  outline : 0;
  box-sizing : border-box;
}
*:focus{
  outline : 0;
}

body{
  -webkit-font-smoothing: antialiased !important;
  background  : #312E38;
  color : #fff;
}

body,input,button{
  font-size : 16px;
  font-family: 'Roboto Slab', serif;
}
h1,h2,h3,h4,h5,h6 strong{
  font-weight : 500;
}
a{
  text-decoration : none;
}
ul{
  list-style : none;
}
button{
  cursor: pointer;
}

::-webkit-scrollbar {
  width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #312E38;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #de595c;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #C44F51;
}

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
    -webkit-transition: "color 9999s ease-out, background-color 9999s ease-out";
    -webkit-transition-delay: 9999s;
}
`;
