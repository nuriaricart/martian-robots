import { useCallback, useState } from "react";
import InputWrapper from "../common/InputWrapper";
import { Coordinate, OrientationEnum, OrientationEnumType, Robot } from "../../types/entityTypes";
import Button from "../common/Button";
import { isValidRobot } from "../../utils/helpers";

type RobotFormProps = {
    saveRobot: (robot: Robot) => void;
    gridSize: Coordinate;
}

const OrientationInput = (props: {setProp: (input: string, key: string) => void, orientation: OrientationEnumType}) => {
    const {setProp, orientation} = props;
    return (
        <div className="flex">
            <div className="flex-1">Orientation</div>
            <div className="flex justify-between flex-[2]">
                {Object.keys(OrientationEnum).map((_orientation, index) => OrientationEnum[index] && 
                    <InputWrapper 
                        key={index} 
                        name="orientation" 
                        type="radio" 
                        labelText={OrientationEnum[index]} 
                        value={OrientationEnum[index]} 
                        keyValue="orientation" 
                        setValue={setProp} 
                        checked={OrientationEnum[index] == orientation} 
                    /> 
                )}
            </div>
        </div>
    );
}

function RobotForm(props: RobotFormProps) {
    const { saveRobot, gridSize } = props;
    const [robot, setRobot] = useState<Robot>({
        id: 0,
        coord: {
            x: '',
            y: ''
        },
        orientation: "N",
        path: ''
    });

    const setCoord = (input: string, key: string) => {
        const updatedRobot = {
            ...robot,
            coord: {
                ...robot.coord,
                [key]: input
            }
        };
        setRobot(updatedRobot);
    };

    const setProp = (input: string, key: string) => {
        const updatedRobot = {
            ...robot,
            [key]: input
        };
        setRobot(updatedRobot);
    };

    const isValidRobotCallback = useCallback(() => {
        return isValidRobot(gridSize, robot);
    }, [robot]);

    return (
        <div className="flex flex-col gap-4 w-full md:w-2/5 p-8 rounded-md shadow-md">
            <h2 className="text-lg font-bold">NEW ROBOT</h2>
            <InputWrapper type="number" labelText={"Start X"} value={robot.coord.x} keyValue="x" setValue={setCoord} classNames={{labelWrapperClassName: "items-center", labelClassName:"flex-1", inputClassName:"flex-[2]" }} />
            <InputWrapper type="number" labelText={"Start Y"} value={robot.coord.y} keyValue="y" setValue={setCoord} classNames={{labelWrapperClassName: "items-center", labelClassName:"flex-1", inputClassName:"flex-[2]" }} />
            <OrientationInput setProp={setProp} orientation={robot.orientation} />
            <InputWrapper type="text" labelText={"Robot Path"} value={robot.path} keyValue="path" setValue={setProp} classNames={{labelWrapperClassName: "items-center", labelClassName:"flex-1", inputClassName:"flex-[2]" }} />
            <Button label="Save your Robot" className="self-center mt-auto" onClick={() => {saveRobot(robot)}} disabled={!isValidRobotCallback()} />
        </div>
    );
}

export default RobotForm;