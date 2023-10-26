import c from "classnames";
import { OrientationEnumType } from "../../types/entityTypes";
import { ChangeEvent, useCallback } from "react";

type InputWrapperProps = {
  labelText: string;
  value: string | OrientationEnumType;
  type: React.HTMLInputTypeAttribute;
  keyValue: string;
  setValue: (input: string, key: string) => void;
  name?: string;
  classNames?: {
    labelWrapperClassName?: string;
    labelClassName?: string;
    inputWrapperClassName?: string;
    inputClassName?: string;
  };
  checked?: boolean;
  helperText?: string;
};

function InputWrapper(props: InputWrapperProps) {
  const {
    labelText,
    value,
    type,
    classNames,
    keyValue,
    setValue,
    name,
    checked,
    helperText,
  } = props;

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value, keyValue)
  }, [setValue, keyValue]);

  return (
    <label className={c("flex gap-2", classNames?.labelWrapperClassName)}>
      <div className={c(classNames?.labelClassName)}>{labelText}</div>
      <div className={c("flex flex-col gap-2", classNames?.inputWrapperClassName)}>
        <input
          name={name}
          type={type}
          value={value as string}
          onChange={onChange}
          min="0"
          checked={checked}
          className={c(
            {
              "bg-zinc-100 appearance-none border border-text-brand-brown-400 rounded py-2 px-4 text-brand-brown-400 leading-tight":
                type != "radio",
            },
            classNames?.inputClassName
          )}
        />
        {helperText && (
          <div className="italic text-xs text-brand-brown-400">
            {helperText}
          </div>
        )}
      </div>
    </label>
  );
}

export default InputWrapper;
