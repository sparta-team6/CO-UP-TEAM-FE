import Router from "./routers/Router";
import { GlobalStyle } from "./styles/GlobalStyle";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/tailwind.css";
import { Suspense } from "react";
import Spinner from "./layout/Spinner";
import { useRecoilValue } from "recoil";
import { themeState } from "./recoil/DarkMode";

const App = () => {
  const theme = useRecoilValue(themeState);
  return (
    <div className={`${theme ? "dark" : ""}`}>
      <Suspense fallback={<Spinner />}>
        <GlobalStyle />
        <Router />
      </Suspense>
    </div>
  );
};

export default App;
