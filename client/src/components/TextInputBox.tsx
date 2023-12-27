import React, { ChangeEvent } from 'react';

type TextInputBoxProps = {
  label: string;
  placeholder: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const TextInputBox: React.FC<TextInputBoxProps> = ({
  label,
  placeholder,
  name,
  value,
  onChange,
}) => {
  return (
    <div className='inputbox-container'>
      <label>{label}</label>
      <input
        type='text'
        value={value}
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        data-testid={`input${label}`}
      />
    </div>
  );
};

export default TextInputBox;
