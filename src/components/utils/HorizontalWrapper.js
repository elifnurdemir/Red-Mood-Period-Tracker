import React from "react";

const HorizontalWrapper = ({children}) => {
  return <div className="flex flex-row max-width-100 horizontal-wrapper">{children}</div>;
};

export default HorizontalWrapper;
