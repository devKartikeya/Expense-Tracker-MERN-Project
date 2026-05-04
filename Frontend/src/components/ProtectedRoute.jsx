import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/auth/check", {
      method: "GET",
      credentials: "include", // 🔹 send cookie
    })
      .then((res) => {
        if (!res.ok) throw new Error("Not authenticated");
        return res.json();
      })
      .then(() => setAuth(true))
      .catch(() => setAuth(false));
  }, []);

  if (auth === null) return <p>Loading...</p>; // while checking
  if (!auth) return <Navigate to="/login" replace />; // redirect if not logged in

  return children; // render protected page
};

export default ProtectedRoute;
