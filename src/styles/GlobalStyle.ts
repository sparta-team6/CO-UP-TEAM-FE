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
  background-color: ${(props) => props.theme.bgColor};
  color : ${(props) => props.theme.textColor};
}
input {
  outline:none;
  caret-color: ${(props) => props.theme.textColor};
  background-color: ${(props) => props.theme.bgColor};
  color : ${(props) => props.theme.textColor};
}
textarea::placeholder , input::placeholder {
  color:${(props) => props.theme.placeColor};
}
ol, ul {
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
.react-calendar__navigation {
  height: 35px;
}
.react-calendar {
  width: 320px;
  height: 310px;
  max-width: 100%;
  border: none;
  border-radius: 0.8em;
  background-color: white;
}
.react-calendar__navigation__arrow {
  font-size: 30px;
}
.react-calendar__navigation__label {
  padding-top: 4px;
}
.react-calendar__navigation__label span {
  font-size: 20px;
  color: #5f99ff;
}
.react-calendar__navigation button:disabled {
  background-color: white
}

.react-calendar__tile ,.react-calendar__month-view__days__day {
  color: black
}

.react-calendar__navigation button {
  color: black;
  min-width: 44px;
  background: none;
  margin-top: 15px;
}
.react-calendar__navigation {
display: flex;
margin-bottom: 20px;
}

abbr[title] {
  text-decoration: none;
  cursor: auto;
  color: black;
}

.react-calendar__month-view__days {
  width: 320px;
}
.react-calendar__month-view__days__day {
  padding: 14px 0;
}
.react-calendar__month-view__days__day--weekend {
  color: #d10000;
}
.react-calendar__month-view__weekdays__weekday {
  padding: 5px 3px;
    text-align: center;
}

.react-calendar__tile:enabled:hover,
.react-calendar__tile:enabled:focus {
  background: #f8f8fa;
  color: #5f99ff;
  border-radius: 30px;
}
.react-calendar__tile--now {
  background: #f8f8fa;
  border-radius: 30px;
  color: black;
}
.react-calendar__tile--now:enabled:hover,
.react-calendar__tile--now:enabled:focus {
  background: #f8f8fa;
  border-radius: 30px;
  color: #5f99ff;
}
.react-calendar__tile--hasActive:enabled:hover,
.react-calendar__tile--hasActive:enabled:focus {
  background: #f8f8fa;
}
.react-calendar__tile--active {
  background: #5f99ff;
  border-radius: 30px;
  color: white;
}
.react-calendar__tile--active:enabled:hover,
.react-calendar__tile--active:enabled:focus {
  background: #5f99ff;
  color: white;
}

@media screen and (max-width: 1300px) {
  .react-calendar {
    width: 100%;
    max-width: 300px;
    max-height: 300px;
    padding: 0;
  }
  .react-calendar__month-view__days {
    width: 300px;
  }
  .react-calendar__navigation {
    margin-bottom: 10px;
    display: flex;
  }
  .react-calendar__month-view__days__day {
    padding: 14px 0;
  }
  .react-calendar__month-view__weekdays {
    display: flex;
  }
  .react-calendar__month-view__weekdays__weekday {
    padding: 5px 3px;
    text-align: center;
  }
}
@media screen and (max-width: 768px) {
  .react-calendar {
    width: 100%;
    max-width: 250px;
    max-height: 250px;
    border-radius: 0.8em;
  }
  .react-calendar__month-view__days {
    width: 250px;
  }
  .react-calendar__navigation {
    margin-bottom: 5px;
  }
  .react-calendar__month-view__days__day {
    padding: 9px 0;
  }
}

.react-calendar {
  background-color: ${(props) => props.theme.bgColor}
}

.react-calendar__tile ,.react-calendar__month-view__days__day {
  color: ${(prop) => prop.theme.textColor};
  /* font-weight: 600; */
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

.MuiBox-root {
  background-color: ${(props) => props.theme.bgColor}
}

/* react-slick */
.slick-arrow::before{
  font-size: 50px;
  color:transparent;
  cursor:default
}
/* .slick-arrow.slick-prev{
  position: absolute;
  top: 272px;
  left: -54px;
} */
.slick-dots li button:before{
  font-size: 10px;
  width: 10px;
  height: 10px;
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
