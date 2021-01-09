import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div>
      <h1>404 Error</h1>
      <p>The page you requested could not be found</p>
      <Link to="/dashboard">Return to Dashboard</Link>
    </div>
  );
};

export default NotFound;
