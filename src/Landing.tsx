import { Fragment, useState } from "react"
import { Cordinate } from "./entityTypes";
import Form from "./Form";
import RobotForm from "./RobotForm";

function Landing() {
  const [gridCord, setGridCord] = useState<Cordinate>({x: '', y: ''});
  const [isRobotForm, setIsRobotForm] = useState(false);

  return (
    <Fragment>
      {isRobotForm ? <RobotForm /> : <Form gridCord={gridCord} setGridCord={setGridCord} setIsRobotForm={setIsRobotForm} />}
    </Fragment>
  )
}

export default Landing
