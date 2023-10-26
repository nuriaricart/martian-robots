import { useCallback, useEffect, useState } from "react";
import { Coordinate, Robot as RobotType } from "../../types/entityTypes";
import Robots from "../Robots";
import Container from "../common/Container";
import RobotForm from "../forms/RobotForm";
import Button from "../common/Button";
import { checkWithinBounds } from "../../utils/helpers";
import ArrowIcon from "../common/ArrowIcon";

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
        <Container className="flex-col justify-center gap-4">
            <div className="w-full flex gap-4 md:gap-8 items-center">
                <div className="md:w-2/5">
                    <Button label="Go back" onClick={goBack} classNames={{buttonWrapperClassName: "self-start md:min-w-[150px]", labelClassName: "hidden md:block"}} isPrimaryButton={false}>
                        <ArrowIcon className="rotate-180" />
                    </Button>
                </div>
                <div className="text-2xl font-bold text-brand-brown-400 justify-center text-center md:text-left md:w-3/5">Size of Mars | X: {gridSize.x} Y: {gridSize.y}</div>
            </div>
            <div className="max-h-[65%] flex flex-col md:flex-row gap-8 w-full h-full">
                <RobotForm saveRobot={saveRobot} gridSize={gridSize} />
                <Robots robots={robots} setRobots={setRobots} gridSize={gridSize} />
            </div>
        </Container>
    );
}

export default RobotLanding;