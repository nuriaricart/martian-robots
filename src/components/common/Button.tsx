import c from "classnames";

type ButtonProps = {
  label: string;
  onClick: () => void;
  classNames?: {
    buttonWrapperClassName?: string;
    labelClassName?: string;
  };
  disabled?: boolean;
  isPrimaryButton?: boolean;
  children?: JSX.Element | JSX.Element[];
};

function Button(props: ButtonProps) {
  const {
    label,
    classNames,
    onClick,
    disabled,
    isPrimaryButton = true,
    children,
  } = props;

  return (
    <button
      className={c("p-4 rounded font-bold shadow disabled:bg-zinc-100 disabled:text-zinc-400 flex items-center gap-4 justify-center",
        classNames?.buttonWrapperClassName,
        {
          "bg-white hover:bg-brand-brown-300 hover:text-white": isPrimaryButton,
          "bg-brand-red-400 text-white hover:bg-white hover:text-black":
            !isPrimaryButton,
        }
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
      <div className={classNames?.labelClassName}>{label}</div>
    </button>
  );
}

export default Button;
