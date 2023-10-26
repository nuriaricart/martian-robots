import c from "classnames";
import { OrientationEnumType } from "./entityTypes";

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
        inputClassName?: string;
    };
    checked?: boolean;
    helperText?: string;
}

// TODO prevent user from entering negative numbers
function InputWrapper (props: InputWrapperProps) {
    const {labelText, value, type, classNames, keyValue, setValue, name, checked, helperText} = props;
    return (
        <label className={c("flex gap-2", classNames?.labelWrapperClassName)}>
            <span className={c(classNames?.labelClassName)}>{labelText}</span>
            <input name={name} type={type} value={value as string} onChange={e => setValue(e.target.value, keyValue)} min="0" checked={checked} className={c({"bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500": type != "radio"}, classNames?.inputClassName)}></input>
            {helperText && <div className="italic text-xs text-gray-400">{helperText}</div>}
        </label>
    )
};

export default InputWrapper;