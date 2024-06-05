import React from "react";

function Input({ placeholder = "", classname = "", type = "", ...props }, ref) {
  return (
    <>
      <input
        type={type}
        className={`w-full py-3 px-3 rounded-lg mb-4 bg-[#1e1e1e]  ${classname} outline-none`}
        placeholder={placeholder}
        ref={ref}
        {...props}
      />
    </>
  );
}

export default React.forwardRef(Input);
