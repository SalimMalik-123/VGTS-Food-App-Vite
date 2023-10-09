import React, { useState } from "react";
import { Input, InputRef } from "antd";

import "./text-field.css";

interface Props{
  label: string
  value?: string
  placeholder?: string
  type?: string
  required?: boolean
  onChange?: React.ChangeEventHandler<HTMLInputElement> 
 ref?: React.Ref<InputRef> | undefined
 error?: boolean
}
const FloatInput = (props:Props) => {
  const [focus, setFocus] = useState(false);
  let { label, value, placeholder, type, required ,ref,error} = props;

  if (!placeholder) placeholder = label;

  const isOccupied = focus || (value && value.length !== 0);

  const labelClass = isOccupied ? "label as-label" : "label as-placeholder";

  const requiredMark = required ? <span className="text-danger">*</span> : null;

  return (
    <div
      className="float-label"
      onBlur={() => setFocus(false)}
      onFocus={() => setFocus(true)}
    >
      <Input ref={ref} 
        onChange={props.onChange} type={type} 
        className="custom-input p-2" 
        defaultValue={value} 
        status={error ? 'error':''}
        name={label}
        required
        />
      <label className={labelClass}>
        {isOccupied ? label : placeholder} {requiredMark}
      </label>
    </div>
  );
};

export default FloatInput;
