import classNames from "classnames";

function Container(props: {children: JSX.Element, className?: string}) {
    return (
        <div className={classNames("h-full w-full flex items-center p-24", props.className)}>
            {props.children}
        </div>
    )
}

export default Container;