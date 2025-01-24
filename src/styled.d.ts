// import original module declarations
import "styled-components";

// and extend them!
declare module "styled-components" {
  //styled component의 테마 정의를 확장하는 것임.
  export interface DefaultTheme {
    textColor: string;
    bgColor: string;
    accentColor: string;
  }
}
