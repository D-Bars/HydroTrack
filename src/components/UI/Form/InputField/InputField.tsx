import clsx from "clsx";
import type { InputHTMLAttributes } from "react";
import cl from "./InputFields.module.scss";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  optional?: boolean;
}

const InputField = ({ label, error, optional, id, className, ...inputProps }: InputFieldProps) => {
  const inputId = id ?? inputProps.name;

  return (
    <label className={cl.field} htmlFor={inputId}>
      <span className={cl.field__label}>
        {label}
        {optional && <span className={cl.field__optional}>(optional)</span>}
      </span>
      <input
        {...inputProps}
        id={inputId}
        className={clsx(cl.field__input, className, error && cl.field__input_error)}
      />
      {error && <span className={cl.field__error}>{error}</span>}
    </label>
  );
};

export default InputField;