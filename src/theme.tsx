import { DefaultTheme } from "styled-components";
// DefaultTheme 타입을 따르는 실제 테마 객체를 정의한 코드
// 이 theme객체는 ThemeProvider에 전달되어 스타일에 사용할 수 있음

export const darkTheme: DefaultTheme = {
  bgColor: "#2f3640",
  textColor: "#f5f6fa",
  accentColor: "#4cd137",
};
export const lightTheme: DefaultTheme = {
  bgColor: "#f5f6fa",
  textColor: "black",
  accentColor: "#4cd137",
};
