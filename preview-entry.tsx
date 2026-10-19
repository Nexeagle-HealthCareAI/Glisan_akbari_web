import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import { MemoryRouter, useLocation } from "react-router-dom";
import App from "./src/App";
function RememberPage() {
  const location = useLocation();
  useEffect(() => {
    const url = new URL(window.location.href);
    if (location.pathname === "/") url.searchParams.delete("page");
    else url.searchParams.set("page", location.pathname);
    url.hash = location.hash;
    window.history.replaceState(null, "", url);
  }, [location.pathname, location.hash]);
  return null;
}
const initial = new URLSearchParams(window.location.search).get("page") || "/";
createRoot(document.getElementById("root")!).render(
  <MemoryRouter initialEntries={[initial]}>
    <RememberPage />
    <App />
  </MemoryRouter>,
);
