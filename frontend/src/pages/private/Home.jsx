import React from "react";
import { useAuth } from "../../context/AuthContext";
import LoadingSpinner from "../../components/common/LoadingSpinner";

export default function Home() {
  const { auth } = useAuth();

  const role = auth?.user?.role?.replace("ROLE_", "") || null;

  if (!role) {
    return <div>NO ROLE ERROR</div>;
  }

  switch (role.toUpperCase()) {
    case "STUDENT":
      return <div>STUDENT HOME</div>;
    case "TEACHER":
      return <div>TEACHER HOME</div>;
    case "ADMIN":
      return <div>ADMIN HOME</div>;

    default:
      return <div>UNKNOWN ERROR</div>;
  }
}
