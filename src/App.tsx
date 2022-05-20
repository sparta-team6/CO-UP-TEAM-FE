import Router from "./routers/Router";
import { GlobalStyle } from "./styles/GlobalStyle";
import "./styles/tailwind.css";
import { Suspense } from "react";
import Spinner from "./layout/Spinner";
import { useRecoilValue } from "recoil";
import { themeState } from "./recoil/DarkMode";
import { ThemeProvider } from "styled-components";
import { Darktheme, LightTheme } from "./styles/theme";

const App = () => {
  const theme = useRecoilValue(themeState);
  return (
    <ThemeProvider theme={theme ? Darktheme : LightTheme}>
      <Suspense fallback={<Spinner />}>
        <GlobalStyle />
        <Router />
      </Suspense>
    </ThemeProvider>
  );
};

export default App;
