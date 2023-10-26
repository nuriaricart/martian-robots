import classNames from 'classnames';
import {Coordinate, OrientationEnumType, Robot as RobotType} from  '../types/entityTypes';

type RobotProps = {
    robot: RobotType;
}

const RobotInfo = (props: {coord: Coordinate, orientation: OrientationEnumType, path?: string, isDisplayLabels?: boolean, isLost?: boolean, className?: string}) => {
    const {coord, orientation, path, isDisplayLabels, isLost, className} = props;
    return (
        <div className={classNames("flex gap-4 flex-wrap", className)}>
            <div className="flex gap-2">{isDisplayLabels && <div className="font-bold">X:</div>}{coord.x}</div>
            <div className="flex gap-2">{isDisplayLabels && <div className="font-bold">Y:</div>}{coord.y}</div>
            <div className="flex gap-2">{isDisplayLabels && <div className="font-bold">O:</div>}{orientation}</div>
            {path && <div className="flex gap-2">
                {isDisplayLabels && <div className="font-bold">P: </div>}{path}</div>}
            {isLost && <div>LOST</div>}
        </div>
    )
}

function Robot(props: RobotProps) {
    const {robot} = props;
    const {id, coord, orientation, path, finalDestination} = robot;

    return (
        <div className="flex gap-4 flex-wrap flex-col lg:flex-row">
            <div className="flex flex-[2] gap-4 p-2 rounded bg-gray-100">
                <h3 className="font-bold border-gray-400 border-r-2 pr-2">{`R${id + 1}`}</h3>
                <RobotInfo coord={coord} orientation={orientation} path={path} className="flex-1" isDisplayLabels/>
            </div>
            {(finalDestination?.coord.x && finalDestination.coord.y && finalDestination.orientation) && (
                <RobotInfo 
                    coord={finalDestination.coord} 
                    orientation={finalDestination.orientation} 
                    isLost={finalDestination.isLost} 
                    className={classNames("flex-1 p-2 rounded", {
                        "bg-green-200": robot.finalDestination && !robot.finalDestination.isLost,
                        "bg-red-100": robot.finalDestination?.isLost,
                    })} 
                />
            )}
        </div>
    );
}

export default Robot;