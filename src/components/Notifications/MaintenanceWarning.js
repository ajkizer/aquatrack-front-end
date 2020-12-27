import React from "react";
import { Badge } from "react-bootstrap";

const MaintenanceWarning = ({ hoursUntilDue }) => {
  let variant;
  const generateText = () => {
    if (hoursUntilDue < 2) {
      variant = "danger";
      return "Due now";
    } else if (hoursUntilDue < 6) {
      variant = "warning";
      return "Due soon";
    }
  };
  return <Badge variant={variant}>{generateText()}</Badge>;
};

export default MaintenanceWarning;
