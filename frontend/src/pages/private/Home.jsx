import React from "react";
import { useAuth } from "../../context/AuthContext";
import IncidentsVisualizationPage from "../user/IncidentsVisualizationPage";
import TechnicianIncidentsPage from "../technician/TechnicianIncidentsPage";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import IncidentAssignmentPage from "../admin/IncidentAssignmentPage";

export default function Home() {
  const { auth, isLoading } = useAuth();

  const role = auth?.user?.authorities?.[0]?.replace("ROLE_", "") || null;

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!role) {
    return <div>{ERROR_MESSAGES.noRoleError}</div>;
  }

  switch (role.toUpperCase()) {
    case "STUDENT":
      return <IncidentsVisualizationPage />;
    case "TEACHER":
      return <TechnicianIncidentsPage />;
    case "ADMIN":
      return <IncidentAssignmentPage />;
    default:
      return <div>{ERROR_MESSAGES.noRoleError}</div>;
  }
}
