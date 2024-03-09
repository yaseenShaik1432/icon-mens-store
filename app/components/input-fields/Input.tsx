import React from "react";

interface InputProps {
  type: string;
  value: any;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  id: string;
  autoComplete?: string;
  required?: any;
}
const Input: React.FC<InputProps> = (props) => {
  return (
    <input
      {...props}
      className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
    />
  );
};

export default Input;
