import React from "react";
import { Navigate } from "react-router-dom";

// Preserve old imports and bookmarks without maintaining a duplicate booking page.
export function BookAppointmentPage() {
  return <Navigate to="/doctors" replace />;
}
