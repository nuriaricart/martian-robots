import { useCallback, useEffect, useState } from "react";
import { Coordinate, Robot as RobotType } from "../../types/entityTypes";
import Robots from "../Robots";
import Container from "../common/Container";
import RobotForm from "../forms/RobotForm";
import Button from "../common/Button";
import { checkWithinBounds } from "../../utils/helpers";

type RobotLandingProps = {
    gridSize: Coordinate;
    setIsRobotForm: React.Dispatch<React.SetStateAction<boolean>>;
}

function RobotLanding(props: RobotLandingProps) {
    const {gridSize, setIsRobotForm} = props;

    const [robots, setRobots] = useState<RobotType[]>([
        {id: 0, coord: {x: "1", y: "1"}, orientation: "E", path: "RFRFRFRF"},
        {id: 1, coord: {x: "3", y: "2"}, orientation: "N", path: "FRRFLLFFRRFLL"},
        {id: 2, coord: {x: "0", y: "3"}, orientation: "W", path: "LLFFFLFLFL"}
    ]);

    useEffect(() => {
        const validRobots: RobotType[] = robots.filter(robot => checkWithinBounds(gridSize, robot.coord)).map(robot => ({...robot, finalDestination: {coord: {x:'', y:''}, orientation: 'N', isLost: false}}));
        setRobots(validRobots);
    }, []);

    const saveRobot = (robot: RobotType) => {
        const newRobots = [...robots]
        newRobots.push({...robot, id: robots.length});
        setRobots(newRobots);
    };

    const goBack = useCallback(() => {setIsRobotForm(false)}, [setIsRobotForm]);

    return (
        <Container className="flex-col justify-center">
            <div className="w-full flex items-center gap-8">
                <Button label="Go back" onClick={goBack} className="self-start min-w-[150px]" />
                <div className="justify-center">Size of Mars | X: {gridSize.x} Y: {gridSize.y}</div>
            </div>
            <div className="max-h-[65%] flex flex-col md:flex-row gap-8 w-full h-full">
                <RobotForm saveRobot={saveRobot} gridSize={gridSize} />
                <Robots robots={robots} setRobots={setRobots} gridSize={gridSize} />
            </div>
        </Container>
    );
}

export default RobotLanding;