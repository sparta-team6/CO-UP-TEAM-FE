import Router from "./routers/Router";
import { GlobalStyle } from "./styles/GlobalStyle";
import "bootstrap/dist/css/bootstrap.min.css";
import "tailwindcss/tailwind.css";
import { Suspense } from "react";
import Spinner from "./layout/Spinner";

const App = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <GlobalStyle />
      <Router />
    </Suspense>
  );
};

export default App;
