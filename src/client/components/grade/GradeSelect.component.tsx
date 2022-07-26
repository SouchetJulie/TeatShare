import {
  createSelectStyle,
  fromEnumToOption,
  getSelectedOption,
  SelectOption,
} from "@components/ui/select-option.utils";
import { EGrade } from "@typing/grade.enum";
import { FunctionComponent, ReactElement } from "react";
import Select, { SingleValue, StylesConfig } from "react-select";

interface GradeSelectProps {
  currentSelected?: string;
  onChange: (selected: SingleValue<{ value: string; label: EGrade }>) => void;
  rounded?: boolean;
}

const grade = Object.entries(EGrade);
const gradeOptions = grade.map(fromEnumToOption);

const GradeSelect: FunctionComponent<GradeSelectProps> = ({
  currentSelected,
  onChange,
  rounded = false,
}: GradeSelectProps): ReactElement => {
  const selectedGrade = getSelectedOption(grade, currentSelected);

  const styles: StylesConfig<
    SelectOption<EGrade>,
    false
  > = createSelectStyle<EGrade>({ rounded });
  return (
    <Select
      isClearable
      className="text-dark"
      options={gradeOptions}
      id="grade"
      name="grade"
      value={selectedGrade}
      onChange={onChange}
      aria-label="Classe"
      placeholder="Classe"
      styles={styles}
    />
  );
};

export default GradeSelect;
