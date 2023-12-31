import { useCallback, useState } from "react";
import InputWrapper from "../common/InputWrapper";
import {
  Coordinate,
  OrientationEnum,
  OrientationEnumType,
  Robot,
} from "../../types/entityTypes";
import Button from "../common/Button";
import { isValidRobot } from "../../utils/helpers";

type RobotFormProps = {
  saveRobot: (robot: Robot) => void;
  gridSize: Coordinate;
};

const OrientationInput = (props: {
  setProp: (input: string, key: string) => void;
  orientation: OrientationEnumType;
}) => {
  const { setProp, orientation } = props;
  return (
    <div className="flex gap-2">
      <div className="flex-1 font-bold text-brand-brown-400">Orientation</div>
      <fieldset className="flex justify-between flex-[2]">
        {Object.keys(OrientationEnum).map(
          (_orientation, index) =>
            OrientationEnum[index] && (
              <InputWrapper
                key={index}
                name="orientation"
                type="radio"
                labelText={OrientationEnum[index]}
                value={OrientationEnum[index]}
                keyValue="orientation"
                setValue={setProp}
                checked={OrientationEnum[index] == orientation}
                classNames={{
                  labelWrapperClassName: "items-center",
                  inputWrapperClassName: "flex-[2]",
                }}
              />
            )
        )}
      </fieldset>
    </div>
  );
};

function RobotForm(props: RobotFormProps) {
  const { saveRobot, gridSize } = props;
  const defaultRobot: Robot = {
    id: 0,
    coord: {
      x: "",
      y: "",
    },
    orientation: "N",
    path: "",
  };
  const [robot, setRobot] = useState<Robot>(defaultRobot);

  const setCoord = useCallback((input: string, key: string) => {
    const updatedRobot = {
      ...robot,
      coord: {
        ...robot.coord,
        [key]: input,
      },
    };
    setRobot(updatedRobot);
  }, [robot, setRobot]);

  const setProp = useCallback((input: string, key: string) => {
    const updatedRobot = {
      ...robot,
      [key]: input,
    };
    setRobot(updatedRobot);
  }, [robot, setRobot]);

  const isValidRobotCallback = useCallback(() => {
    return isValidRobot(gridSize, robot);
  }, [gridSize, robot]);

  const formInputClassNames = {
    labelClassName: "flex-1 font-bold text-brand-brown-400",
    inputWrapperClassName: "flex-[2]",
  };

  const saveRobotForm = useCallback((robot: Robot) => {
    saveRobot(robot);
    setRobot(defaultRobot);
  }, [saveRobot, robot]);

  return (
    <div className="flex flex-col gap-4 w-full md:w-2/5 p-8 rounded-md shadow-lg bg-brand-brown-100">
      <h2 className="text-2xl font-bold text-brand-brown-400 border-b border-brand-brown-400">
        NEW ROBOT
      </h2>
      <InputWrapper
        type="number"
        labelText={"Start X"}
        value={robot.coord.x}
        helperText={`Introuduce a value between 0 and ${gridSize.x} (inclusive)`}
        keyValue="x"
        setValue={setCoord}
        classNames={formInputClassNames}
      />
      <InputWrapper
        type="number"
        labelText={"Start Y"}
        value={robot.coord.y}
        helperText={`Introuduce a value between 0 and ${gridSize.y} (inclusive)`}
        keyValue="y"
        setValue={setCoord}
        classNames={formInputClassNames}
      />
      <OrientationInput setProp={setProp} orientation={robot.orientation} />
      <InputWrapper
        type="text"
        labelText={"Robot Path"}
        value={robot.path}
        helperText={`Values allowed are L, R and F`}
        keyValue="path"
        setValue={setProp}
        classNames={{ ...formInputClassNames, inputClassName: "uppercase" }}
      />
      <Button
        label="Save your Robot"
        classNames={{ buttonWrapperClassName: "self-center mt-auto w-full md:w-auto" }}
        onClick={() => saveRobotForm(robot)}
        disabled={!isValidRobotCallback()}
      />
    </div>
  );
}

export default RobotForm;
