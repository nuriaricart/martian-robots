export enum OrientationEnum {
  "N",
  "E",
  "S",
  "W",
}
export type OrientationEnumType = keyof typeof OrientationEnum;

export enum MoveEnum {
  L,
  R,
  F,
}
export type MoveEnumType = keyof typeof MoveEnum;

export type Coordinate = {
  [key: string]: string;
  x: string;
  y: string;
};

export type Robot = {
  id: number;
  coord: Coordinate;
  orientation: OrientationEnumType;
  path: string;
  finalDestination?: {
    coord: Coordinate;
    orientation: OrientationEnumType;
    isLost: boolean;
  };
};
