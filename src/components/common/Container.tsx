import classNames from "classnames";

function Container(props: {children: JSX.Element | JSX.Element[], className?: string}) {
    return (
        <div className={classNames("h-full w-full flex p-24 items-center", props.className)}>
            {props.children}
        </div>
    )
}

export default Container;