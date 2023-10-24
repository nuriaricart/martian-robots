import {  useState } from "react";
import InputWrapper from "./InputWrapper";
import { OrientationEnumType, Robot } from "./entityTypes";

function RobotForm() {
    const [robot, setRobot] = useState<Robot>({
        cord: {
            x: '',
            y: '',
        }
    });

    const setCord = (input: string, key: string) => {
        const updatedRobot = {
            ...robot,
            cord: {
                ...robot.cord,
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

    return (
        <div>
            <InputWrapper type="number" labelText={"Start X"} value={robot.cord.x} keyValue="x" setValue={setCord}  />
            <InputWrapper type="number" labelText={"Start Y"} value={robot.cord.y} keyValue="y" setValue={setCord}  />
            <InputWrapper type="text" labelText={"Start Orientation"} value={robot.orientation ?? ''} keyValue="orientation" setValue={setProp}  />
            <InputWrapper type="text" labelText={"Robot Path"} value={robot.path ?? ''} keyValue="path" setValue={setProp}  />
        </div>
    );
}


export default RobotForm;