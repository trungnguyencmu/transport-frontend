import { Input } from 'antd';
import { ReactNode } from 'react';

export const CustomInput = ({
  className,
  suffix,
  onChange,
  bg,
  placeholder,
  ...rest
}: {
  className?: string;
  suffix: ReactNode;
  bg: string;
  placeholder: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}) => {
  return (
    <Input
      type="primary"
      suffix={suffix}
      onChange={onChange}
      placeholder={placeholder}
      {...rest}
    />
  );
};
