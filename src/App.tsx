import Router from "./routers/Router";
import { GlobalStyle } from "./styles/GlobalStyle";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/tailwind.css";
import { Suspense } from "react";
import Spinner from "./layout/Spinner";
import { useRecoilValue } from "recoil";
import { themeState } from "./recoil/Atoms";

const App = () => {
  const theme = useRecoilValue(themeState);
  console.log(theme);
  return (
    <div className={`${theme ? "dark" : ""}`}>
      <GlobalStyle />
      <Router />
    </div>
    // <Suspense fallback={<Spinner />}></Suspense>
  );
};

export default App;
