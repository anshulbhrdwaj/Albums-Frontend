import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router } from "react-router-dom";
import MyRoutes from "./routes.jsx";
import AuthProvider from "./constants/AuthContext.jsx";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <NextUIProvider>
        <Router>
          <AuthProvider>
            <main className="dark text-foreground bg-background">
              <MyRoutes />
            </main>
          </AuthProvider>
        </Router>
      </NextUIProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  </React.StrictMode>
);
