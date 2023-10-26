import { useCallback } from "react";
import { Coordinate } from "../../types/entityTypes";
import InputWrapper from "../common/InputWrapper";
import Button from "../common/Button";
import Container from "../common/Container";

type FormProps = {
  gridCoord: Coordinate;
  setGridCoord: React.Dispatch<React.SetStateAction<Coordinate>>;
  setIsRobotForm: React.Dispatch<React.SetStateAction<boolean>>;
};

const CoordinateInput = (props: {
  gridCoord: Coordinate;
  setGridCoord: React.Dispatch<React.SetStateAction<Coordinate>>;
  keyValue: string;
}) => {
  const { gridCoord, setGridCoord, keyValue } = props;
  return (
    <InputWrapper
      labelText="Horizontal Coordinate"
      value={gridCoord[keyValue]}
      type="number"
      keyValue={keyValue}
      setValue={(input, key) => {
        setGridCoord({ ...gridCoord, [key]: input });
      }}
      classNames={{
        labelWrapperClassName: "flex-col flex-1",
        labelClassName: "text-brand-brown-400 font-bold",
        inputWrapperClassName: "w-full",
      }}
      helperText="Positive numbers only"
    />
  );
};

function GridForm(props: FormProps) {
  const { gridCoord, setGridCoord, setIsRobotForm } = props;

  const submitGrid = useCallback(() => {
    setIsRobotForm(true);
  }, [setIsRobotForm]);

  const isValidForm = useCallback(() => {
    return Number(gridCoord.x) >= 0 && Number(gridCoord.y) >= 0;
  }, [gridCoord]);

  return (
    <Container className="h-full justify-center">
      <div className="flex flex-col gap-8 items-center p-16 bg-brand-brown-100 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-brand-brown-400">
          What's the dimension of your Mars grid?
        </h1>
        <div className="w-full flex flex-col sm:flex-row gap-8 justify-between">
          <CoordinateInput
            gridCoord={gridCoord}
            setGridCoord={setGridCoord}
            keyValue="x"
          />
          <CoordinateInput
            gridCoord={gridCoord}
            setGridCoord={setGridCoord}
            keyValue="y"
          />
        </div>
        <Button
          label="Go to Mars!!"
          onClick={submitGrid}
          disabled={!isValidForm()}
        />
      </div>
    </Container>
  );
}

export default GridForm;
