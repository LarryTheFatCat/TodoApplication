import React from "react";
const VerticalThreeDots: React.FC = (props) => {
  return (
    <svg
      aria-hidden="true"
      role="presentation"
      viewBox="-7 -7 30 30"
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="#ffffff"
    >
      <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
    </svg>
  );
};

export default VerticalThreeDots;
