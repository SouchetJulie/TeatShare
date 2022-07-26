import { FunctionComponent, SyntheticEvent } from "react";
import DatePicker from "react-datepicker";

interface DatepickerProps<WithRange extends boolean | undefined> {
  range?: WithRange;
  placeholder?: string;
  start?: Date;
  end?: Date;

  onChange(
    date: WithRange extends false | undefined
      ? Date | null
      : [Date | null, Date | null],
    event: SyntheticEvent<any> | undefined
  ): void;
}

const Datepicker: FunctionComponent<DatepickerProps<boolean | undefined>> = <
  WithRange extends boolean | undefined
>({
  range,
  onChange,
  placeholder = "Choisissez une date",
  start,
  end,
}: DatepickerProps<WithRange>) => {
  return (
    <DatePicker
      dateFormat="dd/MM/yyyy"
      className="rounded-pill border p-2"
      placeholderText={placeholder}
      isClearable
      selectsRange={range}
      selected={start}
      startDate={start}
      endDate={end}
      onChange={onChange}
    />
  );
};

export default Datepicker;
