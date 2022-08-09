import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      white: string;
      pink: string;
      black: string;
      gray: string;
      gray_background: string;
    };
  }
}
