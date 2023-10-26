import { Fragment, useCallback } from "react";
import {
  Coordinate,
  MoveEnumType,
  Robot as RobotType,
} from "../types/entityTypes";
import Button from "./common/Button";
import Robot from "./Robot";
import {
  checkWithinBounds,
  equalRobots,
  getFutureRobot,
} from "../utils/helpers";
import c from "classnames";

type RobotsProps = {
  robots: RobotType[];
  gridSize: Coordinate;
  setRobots: React.Dispatch<React.SetStateAction<RobotType[]>>;
};

function Robots(props: RobotsProps) {
  const { robots, gridSize, setRobots } = props;

  const clearRobots = useCallback(() => {
    setRobots([]);
  }, [setRobots]);

  const checkInScentPaths = (robot: RobotType, scentPaths: RobotType[]) => {
    return scentPaths.some((path) => equalRobots(path, robot));
  };

  const calculateFinalDestinations = useCallback(() => {
    const scentPaths: RobotType[] = [];
    setRobots(robots.map((robot) => submitRobot(robot, scentPaths)));
  }, [setRobots, robots]);

  const submitRobot = useCallback((robot: RobotType, scentPaths: RobotType[]) => {
    const { path } = robot;
    const pathArray: string[] = path.toUpperCase().split("");
    let futureRobot = { ...robot };
    for (const move of pathArray) {
      const possibleFutureRobot = getFutureRobot( futureRobot, move as MoveEnumType );
      const isInBounds = checkWithinBounds(gridSize, possibleFutureRobot.coord);

      if (!isInBounds && !checkInScentPaths(futureRobot, scentPaths)) {
        scentPaths.push(futureRobot);
        futureRobot = {
          ...futureRobot,
          finalDestination: {
            ...futureRobot,
            isLost: true,
          },
        };
        break;
      } else if (isInBounds) {
        futureRobot = possibleFutureRobot;
      }
    }
    return {
      ...robot,
      finalDestination: {
        coord: futureRobot.coord,
        orientation: futureRobot.orientation,
        isLost: futureRobot.finalDestination?.isLost ?? false,
      },
    };
  }, [gridSize]);

  const isButtonDisabled = useCallback(() => {
    return !robots.length;
  }, [robots]);

  return (
    <Fragment>
      <div className="flex flex-col gap-4 w-full md:w-3/5 p-8 rounded-md shadow-lg bg-brand-brown-200">
        <h2 className="text-2xl font-bold text-brand-brown-400 border-b border-brand-brown-400">
          ROBOT DATA
        </h2>
        {robots.length > 0 && (
          <div
            className={c("flex flex-col gap-4 flex-1 overflow-y-auto scroll-px-4 max-h-[410px]",
              {
                "md:pr-4": robots.length > 7,
              }
            )}
          >
            {robots.map((robot, index) => (
              <Robot robot={robot} key={index} />
            ))}
          </div>
        )}

        <div className="flex gap-4 justify-center mt-auto flex-col md:flex-row">
          <Button
            label="Clear your robots"
            onClick={clearRobots}
            disabled={isButtonDisabled()}
            isPrimaryButton={false}
          />
          <Button
            label="Calculate your destinations"
            onClick={calculateFinalDestinations}
            disabled={isButtonDisabled()}
          />
        </div>
      </div>
    </Fragment>
  );
}

export default Robots;
