// components/ui/button.js or components/Button.js
import React from "react";
import clsx from "clsx";

const Button = ({ children, className, variant = "primary", ...props }) => {
  const baseStyles = "px-6 py-3 rounded-xl font-semibold transition cursor-pointer ";

  const variants = {
  primary: "bg-[#B6F500] text-black hover:bg-lime-400",
  secondary: "border-2 border-gray-300 text-gray-700 hover:bg-gray-100",
};

  return (
    <button
      className={clsx(baseStyles, variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
