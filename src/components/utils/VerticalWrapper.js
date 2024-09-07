import React from "react";

const VerticalWrapper = ({children}) => {
  return <div className="flex flex-column height-100vh">{children}</div>;
};

export default VerticalWrapper;
