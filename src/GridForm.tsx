import { useCallback, useState } from "react";
import { Coordinate } from "./entityTypes";
import InputWrapper from "./InputWrapper";
import Button from "./Button";
import Container from "./Container";

type FormProps = {
    gridCoord: Coordinate;
    setGridCoord: React.Dispatch<React.SetStateAction<Coordinate>>;
    setIsRobotForm: React.Dispatch<React.SetStateAction<boolean>>;
}

function GridForm(props: FormProps) {
    const {gridCoord, setGridCoord, setIsRobotForm} = props;
    const [errors, setErrors] = useState("");

    const submitCoord = () => {
        if(!gridCoord.x && !gridCoord.y) setErrors("Missing values for both coordinates");
        else if(!gridCoord.x) setErrors("Missing values for horizontal coordinate");
        else if(!gridCoord.y) setErrors("Missing values for vertical coordinate");
        else setIsRobotForm(true);
    };

    const isValidForm = useCallback(() => {
        return Number(gridCoord.x) > 0 && Number(gridCoord.y) > 0;
    }, [gridCoord]);

    return (
        <Container className="justify-center">
            <div className="flex flex-col gap-4 items-center">
                <h1 className="font-bold">What's the dimension of your Mars grid?</h1>
                <div className="flex gap-8">
                    <InputWrapper 
                        labelText="Horizontal Coordinate" 
                        value={gridCoord.x} 
                        type="number" 
                        keyValue="x" 
                        setValue={(input, key) => {setGridCoord({...gridCoord, [key]: input})}} 
                        classNames={{labelWrapperClassName: "flex-col items-start"}}
                        helperText="Positive numbers only"
                    />
                    <InputWrapper 
                        labelText="Vertical Coordinate"
                        value={gridCoord.y}
                        type="number"
                        keyValue="y"
                        setValue={(input, key) => {setGridCoord({...gridCoord, [key]: input})}}
                        classNames={{labelWrapperClassName: "flex-col"}}
                        helperText="Positive numbers only"
                    />
                </div>
                <Button label="Go to Mars!!" onClick={submitCoord} disabled={!isValidForm()} />
                {errors && (<div>{errors}</div>)}
            </div>
        </Container>
    )
}

export default GridForm;