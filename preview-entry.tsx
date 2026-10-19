import React, { useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import { MemoryRouter, useLocation, useNavigate } from "react-router-dom";
import App from "./src/App";
function RememberPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const first = useRef(true);
  const fromBrowser = useRef(false);
  useEffect(() => {
    const sync = () => {
      fromBrowser.current = true;
      const url = new URL(window.location.href);
      navigate((url.searchParams.get("page") || "/") + url.hash, { replace: true });
    };
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, [navigate]);
  useEffect(() => {
    const url = new URL(window.location.href);
    if (location.pathname === "/") url.searchParams.delete("page");
    else url.searchParams.set("page", location.pathname);
    url.hash = location.hash;
    if (first.current || fromBrowser.current) window.history.replaceState(null, "", url);
    else window.history.pushState(null, "", url);
    first.current = false;
    fromBrowser.current = false;
  }, [location.pathname, location.hash]);
  return null;
}
const initial = (new URLSearchParams(window.location.search).get("page") || "/") + window.location.hash;
createRoot(document.getElementById("root")!).render(
  <MemoryRouter initialEntries={[initial]}>
    <RememberPage />
    <App />
  </MemoryRouter>,
);
