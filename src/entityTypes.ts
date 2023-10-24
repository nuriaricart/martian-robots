export enum OrientationEnum {N, E, S, W};
export type OrientationEnumType = keyof typeof OrientationEnum;

export type Cordinate = {
    x: string;
    y: string;
}

export type Robot = {
    cord: Cordinate;
    orientation?: OrientationEnumType;
    path?: string;
}