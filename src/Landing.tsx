import { Fragment, useState } from "react"
import { Coordinate } from "./entityTypes";
import GridForm from "./GridForm";
import RobotLanding from "./RobotLanding";

function Landing() {
  const [gridCoord, setGridCoord] = useState<Coordinate>({x: '5', y: '3'});
  const [isRobotForm, setIsRobotForm] = useState(false);

  return (
    <Fragment>
      {isRobotForm ? <RobotLanding gridSize={gridCoord} /> : <GridForm gridCoord={gridCoord} setGridCoord={setGridCoord} setIsRobotForm={setIsRobotForm} />}
    </Fragment>
  )
}

export default Landing
