import { CSSObjectWithLabel, GroupBase, StylesConfig } from "react-select";

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
 * Takes an [groupName, optionList] pair and creates the corresponding SelectOptionGroup.
 * @param {[string, SelectOption[]]} group The [groupName, optionList] pair.
 * @return {GroupBase<SelectOption>} The corresponding SelectOptionGroup.
 */
const fromGroupToGroupOptions = ([groupName, optionList]: [
  string,
  SelectOption<string>[]
]): GroupBase<SelectOption<string>> => ({
  label: groupName,
  options: optionList,
});

/**
 * Updates a list of option groups by putting the group with no label in first place.
 * No change is made if there is no such group, or it is already in first place.
 * @param {GroupBase<SelectOption>[]} optionGroups The list of option groups.
 */
const putNoGroupFirst = (
  optionGroups: GroupBase<SelectOption<string>>[]
): void => {
  const noGroupIndex = optionGroups.findIndex(({ label }) => label === "");
  if (noGroupIndex !== -1 && noGroupIndex !== 0) {
    const noGroup = optionGroups.splice(noGroupIndex, 1)[0];
    optionGroups.unshift(noGroup);
  }
};

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

export {
  fromEnumToOption,
  getSelectedOption,
  createSelectStyle,
  fromGroupToGroupOptions,
  putNoGroupFirst,
};
export type { SelectOption, SelectStyle };
