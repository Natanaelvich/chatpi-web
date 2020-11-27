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

`;
