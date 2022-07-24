import { CSSObjectWithLabel, StylesConfig } from "react-select";

interface SelectOption<T extends string> {
  value: string;
  label: T;
}

const fromEnumToOption = <T extends string>([key, text]: [
  string,
  T
]): SelectOption<T> => ({
  value: key,
  label: text,
});
const fromValueToOption = <T extends string>(
  list: [string, T][],
  key?: T[keyof T]
): SelectOption<T> | null => {
  if (!key) {
    return null;
  }

  const found = list.find(([k]) => k === key);

  if (!found) {
    return null;
  }

  return {
    value: found[0],
    label: found[1],
  };
};

interface SelectStyle {
  rounded: boolean;
}

const createSelectStyle = <
  Data extends string,
  isMulti extends boolean = false
>({
  rounded,
}: SelectStyle): StylesConfig<SelectOption<Data>, isMulti> => ({
  control: (baseStyle: CSSObjectWithLabel) => ({
    ...baseStyle,
    borderRadius: rounded ? "25px" : "initial",
  }),
});

export { fromEnumToOption, fromValueToOption, createSelectStyle };
export type { SelectOption, SelectStyle };
