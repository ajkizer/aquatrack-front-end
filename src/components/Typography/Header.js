import React from "react";

const Header = (props) => {
  return (
    <h5 className="_text-header pb-4 skinny row-spacing__header">
      {props.children}
    </h5>
  );
};

export default Header;
