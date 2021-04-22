import React from "react";
import ReactDOM from "react-dom";
import { queryClient } from "./api";
import { BrowserRouter } from "react-router-dom";
import { Main } from "./App/main";
import { QueryClientProvider } from "react-query";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Main />
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>,

  document.getElementById("root")
);
