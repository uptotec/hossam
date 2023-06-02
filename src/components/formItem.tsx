'use client';

import React from 'react';

type formInputProps = {
  value: string | number;
  name: string;
  type?: string;
  onChange: (...args: any) => any;
  placeHolder: string;
  touched: boolean | undefined;
  error: string | undefined;
};

const FormInput: React.FC<formInputProps> = (props) => {
  return (
    <div className="flex flex-col z-0">
      {props.value && (
        <label className="text-sm bg-white px-1 rounded left-2 text-gray-500">
          {props.placeHolder}
        </label>
      )}
      <input
        name={props.name}
        type={props.type || 'number'}
        onChange={props.onChange}
        value={props.value}
        placeholder={props.placeHolder}
        className={`${
          props.touched && props.error && 'border-red-500 ring-red-500'
        } w-full py-2 px-4 border rounded-md focus:ring-[#31708e] focus:border-[#31708e]`}
      />
      {props.touched && props.error && (
        <span className="text-xs mt-1 text-red-500">{props.error}</span>
      )}
    </div>
  );
};

export default FormInput;
