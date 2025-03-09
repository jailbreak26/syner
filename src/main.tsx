import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
//Theme
import type { CustomFlowbiteTheme } from "flowbite-react";
import { Flowbite } from "flowbite-react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a client
const queryClient = new QueryClient();

const customTheme: CustomFlowbiteTheme = {
  button: {
    color: {
      primary: "bg-primary-500 text-white hover:bg-primary-900",
    },
  },
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <Flowbite theme={{ theme: customTheme, mode: "dark" }}>
      <App />
    </Flowbite>
  </QueryClientProvider>,
);
