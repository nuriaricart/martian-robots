import classnames from "classnames";

type ButtonProps = {
    label: string;
    onClick: () => void;
    className?: string;
    disabled?: boolean;
}

function Button(props: ButtonProps) {
    const {label, className, onClick, disabled} = props;

    return (
        <button className={classnames("p-4 rounded font-bold shadow bg-white disabled:bg-gray-100 disabled:text-gray-400", className)} onClick={onClick} disabled={disabled}>{label}</button>
    );
}

export default Button;