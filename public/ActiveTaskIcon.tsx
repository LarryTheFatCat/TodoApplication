import React from "react";
import { AllTaskIconProps } from "../interfaces/Interfaces";

const ActiveTaskIcon: React.FC<AllTaskIconProps> = ({
  size,
  height,
  width,
  ...props
}) => {
  return (
    <svg
      className="ml-2"
      {...props}
      height={18}
      width={18}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16 3H14.3575C13.5255 3 12.765 3.47005 12.3929 4.21417V4.21417C12.231 4.53795 11.769 4.53795 11.6071 4.21417V4.21417C11.235 3.47005 10.4745 3 9.64251 3H8"
        stroke="#D8D4D4FF"
        strokeWidth={1.2}
      />
      <path
        d="M19 12V6C19 4.34315 17.6569 3 16 3H8C6.34315 3 5 4.34315 5 6V18C5 19.6569 6.34315 21 8 21H10"
        stroke="#D8D4D4FF"
        strokeWidth={1.2}
        strokeLinecap="round"
      />
      <line
        fill="none"
        stroke="#D8D4D4FF"
        strokeWidth={1.1}
        strokeMiterlimit={2}
        x1={17}
        y1={8}
        x2={7}
        y2={8}
      />
      <line
        fill="none"
        stroke="#D8D4D4FF"
        strokeWidth={1.1}
        strokeMiterlimit={2}
        x1={17}
        y1={12}
        x2={7}
        y2={12}
      />
      <line
        fill="none"
        stroke="#D8D4D4FF"
        strokeWidth={1.1}
        strokeMiterlimit={2}
        x1={12}
        y1={16}
        x2={7}
        y2={16}
      />
      <circle cx={16} cy={18} r={3.5} stroke="#D8D4D4FF" strokeWidth={1.35} />
    </svg>
  );
};

export default ActiveTaskIcon;
