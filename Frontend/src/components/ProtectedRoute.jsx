import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("https://expense-tracker-mern-project-g2yt.onrender.com/auth/check", {
      method: "GET",
      credentials: "include", // send cookie
    })
      .then((res) => {
        if (!res.ok) throw new Error("Not authenticated");
        return res.json();
      })
      .then((data) => {
        setAuth(true);
        setUser(data.user); // store user info
      })
      .catch(() => setAuth(false));
  }, []);

  if (auth === null) return <p>Loading...</p>;
  if (!auth) return <Navigate to="/login" replace />;

  // Pass user down to the protected page
  return React.cloneElement(children, { user });
};

export default ProtectedRoute;
