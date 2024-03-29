import {
  createSelectStyle,
  fromEnumToOption,
  getSelectedOption,
  SelectOption,
} from "@components/ui/select-option.utils";
import { ESubject } from "@typing/subject.enum";
import { FunctionComponent, ReactElement } from "react";
import Select, { GroupBase, SingleValue, StylesConfig } from "react-select";

interface SubjectSelectProps {
  currentSelected?: string;
  onChange: (selected: SingleValue<{ value: string; label: ESubject }>) => void;
  rounded?: boolean;
}

const subjects = Object.entries(ESubject);
const subjectOptions = subjects.map(fromEnumToOption);

const SubjectSelect: FunctionComponent<SubjectSelectProps> = ({
  currentSelected,
  onChange,
  rounded = false,
}: SubjectSelectProps): ReactElement => {
  const selectedSubject = getSelectedOption(subjects, currentSelected);

  const styles: StylesConfig<
    SelectOption<ESubject>,
    false
  > = createSelectStyle<ESubject>({ rounded });

  return (
    <Select<SelectOption<ESubject>, false, GroupBase<SelectOption<ESubject>>>
      isClearable
      className="text-dark"
      options={subjectOptions}
      id="subject"
      name="subject"
      value={selectedSubject}
      onChange={onChange}
      aria-label="Matière"
      placeholder="Matière"
      styles={styles}
      hideSelectedOptions
    />
  );
};

export default SubjectSelect;
