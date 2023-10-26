import { Fragment, useState } from "react"
import { Coordinate } from "../../types/entityTypes";
import GridForm from "../forms/GridForm";
import RobotLanding from "./RobotLanding";

function Landing() {
  const [gridCoord, setGridCoord] = useState<Coordinate>({x: '5', y: '3'});
  const [isRobotForm, setIsRobotForm] = useState(false);

  return (
    <Fragment>
      {isRobotForm ? <RobotLanding gridSize={gridCoord} setIsRobotForm={setIsRobotForm} /> : <GridForm gridCoord={gridCoord} setGridCoord={setGridCoord} setIsRobotForm={setIsRobotForm} />}
    </Fragment>
  )
}

export default Landing
