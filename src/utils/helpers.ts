import {
  Coordinate,
  MoveEnum,
  MoveEnumType,
  OrientationEnum,
  OrientationEnumType,
  Robot,
} from "../types/entityTypes";

export function getFutureRobot(robot: Robot, move: MoveEnumType): Robot {
  switch (move) {
    case "F":
      return { ...robot, coord: getNextPosition(robot) };
    case "L":
    case "R":
      return {
        ...robot,
        orientation: updateOrientation(robot.orientation, move),
      };
    default:
      return robot;
  }
}

export function getNextPosition(robot: Robot): Coordinate {
  const robotCoord = robot.coord;
  switch (robot.orientation) {
    case "N":
      return { ...robotCoord, y: (Number(robotCoord.y) + 1).toString() };
    case "E":
      return { ...robotCoord, x: (Number(robotCoord.x) + 1).toString() };
    case "S":
      return { ...robotCoord, y: (Number(robotCoord.y) - 1).toString() };
    default:
      return { ...robotCoord, x: (Number(robotCoord.x) - 1).toString() };
  }
}

export function updateOrientation(
  currentOrientation: OrientationEnumType,
  move: MoveEnumType
): OrientationEnumType {
  let newOrientation;
  switch(move) {
    case "R": 
      newOrientation = OrientationEnum[currentOrientation] + 1;
      break;
    default:
      newOrientation = OrientationEnum[currentOrientation] - 1;
      break;

  }
  const enumLength = Object.keys(OrientationEnum).length / 2;
  const newOrientationIndex = ((newOrientation % enumLength) + enumLength) % enumLength;
  return Object.keys(OrientationEnum).find(
    (key) => (OrientationEnum[key as OrientationEnumType]) === newOrientationIndex
  ) as OrientationEnumType;
}

export function checkWithinBounds( gridSize: Coordinate, futureCoord: Coordinate ): boolean {
  return futureCoord.x <= gridSize.x && futureCoord.y <= gridSize.y;
}

export function equalRobots(robot1: Robot, robot2: Robot): boolean {
  return (
    robot1.coord.x === robot2.coord.x &&
    robot1.coord.y === robot2.coord.y &&
    robot1.orientation === robot2.orientation
  );
}

export function isValidRobot(gridSize: Coordinate, robot: Robot) {
  return (
    robot.coord.x && Number(robot.coord.x) >= 0 &&
    robot.coord.y && Number(robot.coord.y) >= 0 &&
    robot.orientation &&
    isValidPath(robot.path) &&
    checkWithinBounds(gridSize, robot.coord)
  );
}

export function isValidPath(path: string): boolean {
  return (
    path.length > 0 &&
    path
      .toUpperCase()
      .split("")
      .filter((move) => !(move in MoveEnum)).length == 0
  );
}

export function isValidGrid (coord: Coordinate): boolean {
  return Number(coord.x) >= 0 && Number(coord.y) >= 0;
}
