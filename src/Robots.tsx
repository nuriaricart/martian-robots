import { Fragment, useCallback } from "react";
import { Coordinate, MoveEnumType, Robot as RobotType } from "./entityTypes";
import Button from "./Button";
import Robot from "./Robot";
import { checkWithinBounds, equalRobots, getNextPosition, updateOrientation } from "./helpers";

type RobotsProps = {
    robots: RobotType[];
    gridSize: Coordinate;
    setRobots: React.Dispatch<React.SetStateAction<RobotType[]>>;
}

function Robots(props: RobotsProps) {
    const {robots, gridSize, setRobots} = props;

    const clearRobots = useCallback(() => {setRobots([])}, [setRobots]);

    const checkInScentPaths = (robot: RobotType, scentPaths: RobotType[]) => {
        return scentPaths.some(path => equalRobots(path, robot));
     };
 
     const calculateFinalDestinations = () => {
         let scentPaths: RobotType[] = [];
         setRobots(robots.map(robot => submitRobot(robot, scentPaths)));
     }
 
     const submitRobot = (robot: RobotType, scentPaths: RobotType[]) => {
         const {path} = robot;
             const pathArray: string[] = path.toUpperCase().split('');            
             let futureRobot = {...robot};
         for(const move of pathArray) {
             const moveValue = move as MoveEnumType;
             const possibleFutureRobot = ["R", "L"].includes(moveValue) ? {...futureRobot, orientation: updateOrientation(futureRobot.orientation, moveValue)} : {...futureRobot, coord: getNextPosition(futureRobot)};
             const isInBounds = checkWithinBounds(gridSize, possibleFutureRobot.coord);
 
             if(!isInBounds && !checkInScentPaths(futureRobot, scentPaths)) {
                 scentPaths.push(futureRobot);
                 futureRobot = {
                     ...futureRobot,
                     finalDestination: {
                         ...futureRobot,
                         isLost: true
                     }
                 };
                 break;
             } else if(isInBounds) {
                 futureRobot = possibleFutureRobot;
             } 
         }
         return ({
             ...robot,
             finalDestination: {
                 coord: futureRobot.coord,
                 orientation: futureRobot.orientation,
                 isLost: futureRobot.finalDestination?.isLost ?? false
             }
         });
     };

    const isButtonDisabled = useCallback(() => {
        return !robots.length;
    }, [robots])

    return (
        <Fragment>
            <div className="flex flex-col gap-4 w-full md:w-3/5 p-8 rounded-md shadow-md">
                <h2 className="text-lg font-bold">ROBOT DATA</h2>
                {(robots.length > 0) && (
                    <div className="flex flex-col gap-4 flex-1">
                        {robots.map((robot, index) => <Robot robot={robot} key={index} />)}
                    </div>
                )}
                
                <div className="flex gap-4 justify-center mt-auto">
                    <Button label="Clear your robots" onClick={clearRobots} disabled={isButtonDisabled()} />
                    <Button label="Trigger your robots" onClick={calculateFinalDestinations} disabled={isButtonDisabled()} />
                </div>
            </div>
        </Fragment>
    )
}

export default Robots;