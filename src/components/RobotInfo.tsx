import { Coordinate, OrientationEnumType } from "../types/entityTypes";
import c from 'classnames';

type RobotInfoProps = {
    coord: Coordinate;
    orientation: OrientationEnumType;
    path?: string;
    isDisplayLabels?: boolean;
    isLost?: boolean;
    className?: string;
}

function RobotInfo (props: RobotInfoProps) {
    const {coord, orientation, path, isDisplayLabels, isLost, className} = props;
    const labelClassName = "font-bold text-brand-brown-400";

    return (
        <div className={c("flex gap-4 flex-wrap", className)}>
            <div className="flex gap-2">{isDisplayLabels && <div className={labelClassName}>X:</div>}{coord.x}</div>
            <div className="flex gap-2">{isDisplayLabels && <div className={labelClassName}>Y:</div>}{coord.y}</div>
            <div className="flex gap-2">{isDisplayLabels && <div className={labelClassName}>O:</div>}{orientation}</div>
            {path && <div className="flex gap-2">
                {isDisplayLabels && <div className={labelClassName}>P: </div>}{path}</div>}
            {isLost && <div>LOST</div>}
        </div>
    );
}

export default RobotInfo;