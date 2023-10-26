import { useState } from "react";
import { Coordinate, Robot as RobotType } from "../../types/entityTypes";
import Robots from "../Robots";
import Container from "../common/Container";
import RobotForm from "../forms/RobotForm";

type RobotLandingProps = {
    gridSize: Coordinate;
}

function RobotLanding(props: RobotLandingProps) {
    const {gridSize} = props;

    const [robots, setRobots] = useState<RobotType[]>([
        {id: 0, coord: {x: "1", y: "1"}, orientation: "E", path: "RFRFRFRF"},
        {id: 1, coord: {x: "3", y: "2"}, orientation: "N", path: "FRRFLLFFRRFLL"},
        {id: 2, coord: {x: "0", y: "3"}, orientation: "W", path: "LLFFFLFLFL"}
    ]);

    const saveRobot = (robot: RobotType) => {
        const newRobots = [...robots]
        newRobots.push({...robot, id: robots.length});
        setRobots(newRobots);
    };

    return (
        <Container className="items-center">
            <div className="max-h-[65%] flex flex-col md:flex-row gap-8 w-full h-full">
                <RobotForm saveRobot={saveRobot} gridSize={gridSize} />
                <Robots robots={robots} setRobots={setRobots} gridSize={gridSize} />
            </div>
        </Container>
    );
}

export default RobotLanding;