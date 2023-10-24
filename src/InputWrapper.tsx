import classNames from "classnames";
import { OrientationEnumType } from "./entityTypes";

type InputWrapperProps = {
    labelText: string;
    value: string | OrientationEnumType;
    type: React.HTMLInputTypeAttribute;
    className?: string;
    keyValue: string;
    setValue: (input: string, key: string) => void;
}

function InputWrapper (props: InputWrapperProps) {
    const {labelText, value, type, className, keyValue, setValue} = props;
    return (
        <label className={classNames("flex flex-col gap-1", className)}>
            {labelText}
            <input type={type} value={value as string} onChange={e => setValue(e.target.value, keyValue)}></input>
        </label>
    )
};

export default InputWrapper;