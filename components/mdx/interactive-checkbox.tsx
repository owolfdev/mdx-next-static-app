"use client";
import React, { useState, ReactNode } from "react";

interface InteractiveCheckboxProps {
  children: ReactNode;
  checked: boolean;
}

const InteractiveCheckbox: React.FC<InteractiveCheckboxProps> = ({
  children,
  checked,
}) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
      <span>{children}</span>
    </div>
  );
};

export default InteractiveCheckbox;
