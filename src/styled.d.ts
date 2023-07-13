import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        bgColor: string;
        textColor: string;
        accentColor: string;
        circle1Color: string;
        circle2Color: string;
    }
}