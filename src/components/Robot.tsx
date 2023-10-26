import c from "classnames";
import { Robot as RobotType } from "../types/entityTypes";
import RobotInfo from "./RobotInfo";

type RobotProps = {
  robot: RobotType;
};

function Robot(props: RobotProps) {
  const { robot } = props;
  const { id, coord, orientation, path, finalDestination } = robot;

  return (
    <div className="flex gap-4 flex-wrap flex-col lg:flex-row">
      <div className="flex flex-[2] gap-4 p-2 rounded bg-zinc-100">
        <h3 className="font-bold border-r-2 border-brand-brown-400 pr-2 text-brand-brown-400">{`R${id + 1}`}</h3>
        <RobotInfo
          coord={coord}
          orientation={orientation}
          path={path}
          className="flex-1"
          isDisplayLabels
        />
      </div>
      {finalDestination?.coord.x &&
        finalDestination.coord.y &&
        finalDestination.orientation && (
          <RobotInfo
            coord={finalDestination.coord}
            orientation={finalDestination.orientation}
            isLost={finalDestination.isLost}
            className={c("flex-1 p-2 rounded font-bold", {
              "bg-brand-green-200": robot.finalDestination && !robot.finalDestination.isLost,
              "bg-brand-red-200": robot.finalDestination?.isLost,
            })}
          />
        )}
    </div>
  );
}

export default Robot;
