import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, useRoutes } from "react-router-dom";
import { routes } from "@/routes/routes.tsx";

function AppRoutes() {
  return useRoutes(routes);
}
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </StrictMode>
);
