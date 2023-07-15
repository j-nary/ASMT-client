import { createGlobalStyle } from 'styled-components';

import titleFont from '../Assets/Fonts/Title.ttf';
import lightFont from '../Assets/Fonts/Light.ttf';
import boldFont from '../Assets/Fonts/Bold.ttf';

export default createGlobalStyle`
 @font-face {
    font-family: "Font";
    src: local("Font"), url(${titleFont}) format('ttf');
    font-weight: lighter;
 }
 @font-face {
    font-family {
        font-family: "Font";
        src: local("Font"), url()(${lightFont}) format()('ttf');
        font-weight: normal;
    }
 }
 @font-face {
    font-family: "Font";
    src: local("Font"), url(${boldFont}) format('ttf');
    font-weight: bold;
 }
`