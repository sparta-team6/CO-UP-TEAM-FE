import Router from "./routers/Router";
import { GlobalStyle } from "./styles/GlobalStyle";
import "./styles/tailwind.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Suspense } from "react";
import { useRecoilValue } from "recoil";
import { themeState } from "./recoil/DarkMode";
import { ThemeProvider } from "styled-components";
import { Darktheme, LightTheme } from "./styles/theme";
import SpinnerDark from "./layout/SpinnerDark";
import SpinnerLigth from "./layout/SpinnerLigth";

// 다크모드 ThemeProvider 설정
// Suspense 다크모드에 따른 컴포넌트 분리

const App = () => {
  const theme = useRecoilValue(themeState);
  return (
    <ThemeProvider theme={theme ? Darktheme : LightTheme}>
      <Suspense fallback={theme ? <SpinnerDark /> : <SpinnerLigth />}>
        <GlobalStyle />
        <Router />
      </Suspense>
    </ThemeProvider>
  );
};

export default App;
