import { CSSObjectWithLabel, StylesConfig } from "react-select";

interface SelectOption<LabelType extends string, ValueType = string> {
  value: ValueType;
  label: LabelType;
}

/**
 * Converts a [key, text] pair from Object.entries() to a SelectOption.
 * For use with an enum.
 *
 * @template T
 * @param {string} key The key of the entry.
 * @param {T} text The value of the entry.
 * @return {SelectOption<T>} The converted entry.
 */
const fromEnumToOption = <T extends string>([key, text]: [
  string,
  T
]): SelectOption<T> => ({
  value: key,
  label: text,
});
/**
 * Gets the corresponding SelectOption for a given enum key.
 *
 * @template T
 * @param {[string, T][]} list Array of [key, text] pair from Object.entries()
 * @param {string} key The key to search.
 * @return {SelectOption<T>|null} The corresponding SelectOption or null if not found.
 */
const getSelectedOption = <T extends string>(
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

/**
 * Creates a CSS config for a Select component.
 *
 * @param {SelectStyle} params The parameters for the CSS config.
 * @return {StylesConfig} The CSS config.
 */
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

export { fromEnumToOption, getSelectedOption, createSelectStyle };
export type { SelectOption, SelectStyle };
