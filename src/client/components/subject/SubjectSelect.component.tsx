import {
  fromEnumToOption,
  fromValueToOption,
} from "@components/ui/select-option.utils";
import { ESubject } from "@typing/subject.enum";
import { FunctionComponent, ReactElement } from "react";
import Select, { SingleValue } from "react-select";

interface SubjectSelectProps {
  currentSelected?: string;
  onChange: (selected: SingleValue<{ value: string; label: ESubject }>) => void;
}

const subjects = Object.entries(ESubject);
const subjectOptions = subjects.map(fromEnumToOption);

const SubjectSelect: FunctionComponent<SubjectSelectProps> = ({
  currentSelected,
  onChange,
}: SubjectSelectProps): ReactElement => {
  const selectedSubject = fromValueToOption(subjects, currentSelected);

  return (
    <Select
      className="text-dark"
      options={subjectOptions}
      id="subject"
      name="subject"
      value={selectedSubject}
      onChange={onChange}
      aria-label="Matière"
      placeholder="Matière"
    />
  );
};

export default SubjectSelect;
