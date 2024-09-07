import React from "react";

const HorizontalWrapper = ({children}) => {
  return <div className="flex flex-row max-width-100 horizontal-wrapper align-stretch flex-1">{children}</div>;
};

export default HorizontalWrapper;
