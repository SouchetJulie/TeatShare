import {
  fromEnumToOption,
  fromValueToOption,
} from "@components/ui/select-option.utils";
import { EGrade } from "@typing/grade.enum";
import { FunctionComponent, ReactElement } from "react";
import Select, { SingleValue } from "react-select";

interface GradeSelectProps {
  currentSelected?: string;
  onChange: (selected: SingleValue<{ value: string; label: EGrade }>) => void;
}

const grade = Object.entries(EGrade);
const gradeOptions = grade.map(fromEnumToOption);

const GradeSelect: FunctionComponent<GradeSelectProps> = ({
  currentSelected,
  onChange,
}: GradeSelectProps): ReactElement => {
  const selectedGrade = fromValueToOption(grade, currentSelected);

  return (
    <Select
      className="text-dark"
      options={gradeOptions}
      id="grade"
      name="grade"
      value={selectedGrade}
      onChange={onChange}
      aria-label="Classe"
      placeholder="Classe"
    />
  );
};

export default GradeSelect;
