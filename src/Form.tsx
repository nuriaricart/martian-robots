import { useState } from "react";
import { Cordinate } from "./entityTypes";
import Container from "./Container";
import InputWrapper from "./InputWrapper";

type FormProps = {
    gridCord: Cordinate;
    setGridCord: React.Dispatch<React.SetStateAction<Cordinate>>;
    setIsRobotForm: React.Dispatch<React.SetStateAction<boolean>>;
}

function Form(props: FormProps) {
    const {gridCord, setGridCord, setIsRobotForm} = props;
    const [errors, setErrors] = useState("");

    const submitCord = () => {
        if(!gridCord.x && !gridCord.y) setErrors("Missing values for both coordinates");
        else if(!gridCord.x) setErrors("Missing values for horizontal coordinate");
        else if(!gridCord.y) setErrors("Missing values for vertical coordinate");
        else setIsRobotForm(true);
    };

    return (
        <Container className="">
            <div className="flex flex-col gap-4 items-center">
                <h1 className="font-bold">What's the dimension of your Mars grid?</h1>
                <div className="flex gap-8">
                    <InputWrapper labelText="Horizontal cordinate" value={gridCord.x} type="number" keyValue="x" setValue={(input, key) => {setGridCord({...gridCord, [key]: input})}} />
                    <InputWrapper labelText="Vertical cordinate" value={gridCord.y} type="number" keyValue="y" setValue={(input, key) => {setGridCord({...gridCord, [key]: input})}} />
                </div>
                <button className="self-center p-4 rounded font-bold shadow" onClick={submitCord}>Go to Mars!!</button>
                {errors && (<div>{errors}</div>)}
            </div>
        </Container>
    )
}

export default Form;