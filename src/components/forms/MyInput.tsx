import { Input } from 'antd';
import React, { ReactNode } from 'react';
import { Control, Controller, FieldError } from 'react-hook-form';
import Colors from '../../constants/Colors'; // Import Colors constant
import FormItemHook from './FormItem/FormItemHook';

interface MyInputProps {
  name: string; // Field name in the form
  label?: string; // Label for the input
  placeholder?: string; // Placeholder text
  type?: string; // Input type (e.g., text, password)
  error?: FieldError; // Error from React Hook Form
  control: Control<any>; // React Hook Form Control
  isOptional?: boolean; // Optional field indicator
  suffix?: ReactNode; // Optional field indicator
  onChange: React.ChangeEventHandler<HTMLInputElement>
}

const MyInput: React.FC<MyInputProps> = ({
  name,
  label,
  placeholder,
  type = 'text',
  error,
  control,
  isOptional = false,
  suffix,
  ...rest
}) => {
  return (
    <FormItemHook label={label} required={!isOptional} errors={error}>
      {/* Input Field */}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            suffix={suffix}
            placeholder={placeholder}
            type={type}
            status={error ? 'error' : undefined}
            className="w-full bg-input text-primaryText rounded-lg py-2 px-3 focus:ring-2 focus:ring-primary"
            style={{
              backgroundColor: Colors.input,
              color: Colors.primaryText,
              border: '1px solid transparent',
            }}
            {...rest}
          />
        )}
      />
    </FormItemHook>
  );
};

export default MyInput;
