import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import App from "./App";
import { ReactQueryDevtools } from "react-query/devtools";
import { RecoilRoot } from "recoil";
import "./styles/font.css";
export const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <RecoilRoot>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      <App />
    </QueryClientProvider>
  </RecoilRoot>
);
