import classnames from "classnames";

type ButtonProps = {
    label: string;
    className?: string;
    onClick: () => void;
    disabled?: boolean;
}

function Button(props: ButtonProps) {
    const {label, className, onClick, disabled} = props;

    return (
        <button className={classnames("self-center p-4 rounded font-bold shadow bg-white disabled:bg-gray-100 disabled:text-gray-400", className)} onClick={onClick} disabled={disabled}>{label}</button>
    );
}

export default Button;