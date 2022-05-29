import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
* {
  &::-webkit-scrollbar {
    width: 4px;
    height: 5px;
    border-radius: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background: #5F99FF;
    border-radius: 5px;
  }
}
body {
  background-color: #f0f3f7;
  font-family: "AppleSDGothicNeo";
}
ul{
  background-color: white;
}
button{
  outline: none;
  border: none;
  background-color: transparent;
  -moz-appearance:none; /* Firefox */
  -webkit-appearance:none; /* Safari and Chrome */
  appearance:none;
  padding: 0;
}
/* span {
  color: ${(props) => props.theme.textColor}
} */
svg {
  color: ${(props) => props.theme.textColor}
}
nav {
  background-color: ${(props) => props.theme.bgColor}
}

details > summary::-webkit-details-marker {
  display: none;
}
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	/* font: inherit; */
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
/* section {
  background-color: ${(prop) => prop.theme.bgColor};
} */
span {
  color: ${(prop) => prop.theme.textColor};
}
body {
	line-height: 1;
}
textarea {
  border-width: 0px;
  caret-color: ${(props) => props.theme.textColor};
}
ol, ul {
	list-style: none;
}
input {
  outline:none;
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
a{
  text-decoration: none;
  color: black;
}
@media (max-width:551px) {
  &::-webkit-scrollbar {
    display: none;
  }
}

/* calendar */

.react-calendar {
  background-color: ${(props) => props.theme.bgColor}
}


.react-calendar__tile ,.react-calendar__month-view__days__day {
  color: ${(prop) => prop.theme.textColor};
}

.react-calendar__month-view__days__day--weekend {
  color: red;
}

.react-calendar__tile--active {
  color:white;
}

.react-calendar__navigation button {
  color: ${(prop) => prop.theme.textColor};
  min-width: 44px;
  background: none;
  margin-top: 15px;
}

.react-calendar__navigation button:disabled {
  background-color: ${(props) => props.theme.bgColor}
}

abbr[title] {
  text-decoration: none;
  cursor: auto;
  color: ${(prop) => prop.theme.textColor};
}


/* projectlist */
.pjList:nth-child(4n+4){
  margin-right: 0;
}
@media screen and (max-width: 1300px) {
  .pjList:nth-child(4n+4){
    margin-right: 12px;
  }
}
@media screen and (max-width: 768px) {
  .pjList:nth-child(4n+4){
    margin-right: 0px;
  }
}

/* mui modal */
.MuiList-root.MuiList-padding.MuiMenu-list{
  padding: 0;
  width: 100%;
}
abbr[title]{
  text-decoration: none;
  cursor: auto;
}

/* react-slick */
.slick-arrow::before{
  font-size: 50px;
}
.slick-arrow.slick-prev{
  position: absolute;
  top: 272px;
  left: -54px;
}
.slick-dots li button:before{
  line-height: 4;
  font-size: 14px;
  width: 17px;
  height: 17px;
}
.slick-dots li.slick-active button:before{
  color: #5F99FF;
}

.slick-dots {
  background-color: transparent;
}

/* editor */
.toastui-editor-defaultUI{
  border: none;
}
.toastui-editor-defaultUI .ProseMirror{
  padding-left: 44px !important;
  padding-top: 14px !important;
  font-size: 16px !important;
}
@media screen and (max-width: 768px) {
  .toastui-editor-defaultUI .ProseMirror{
    padding-left: 10px !important;
    padding-top: 10px !important;
  }
  .MuiSvgIcon-root{
    margin: 0;
    width: 30px;
    height: 30px;
  }
}

/* sweetalert2 */
.swal2-container{
  z-index: 9999;
}

/* apexchart */
.apexcharts-legend{
  inset: auto 0 -2px !important;
}
.apexcharts-legend-marker{
  width: 8px !important;
  height: 8px !important;
  margin-right: 6px !important;
}
.apexcharts-legend-series{
  margin: 0 10px !important;
}
foreignObject{
  height: 225px !important;
}
.apexcharts-svg{
  height: 225px !important;
}
SvgjsFeFuncR1393{
  color: red;
}
`;
