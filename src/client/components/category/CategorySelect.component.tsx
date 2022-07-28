import {
  createSelectStyle,
  fromGroupToGroupOptions,
  putNoGroupFirst,
  SelectOption,
} from "@components/ui/select-option.utils";
import { useCategoryList } from "@hooks/category-list.hook";
import { ICategory } from "@typing/category.interface";
import { FunctionComponent, ReactElement, useMemo } from "react";
import Select, { MultiValue, StylesConfig } from "react-select";

interface CategorySelectProps {
  currentSelected?: string[];
  onChange: (newValues: MultiValue<{ value: string; label: string }>) => void;
  rounded?: boolean;
  groupShown?: string;
}

const fromCategoryToOption = (category: ICategory): SelectOption<string> => ({
  value: category._id,
  label: category.label,
});

const CategorySelect: FunctionComponent<CategorySelectProps> = ({
  currentSelected,
  onChange,
  rounded = false,
  groupShown,
}: CategorySelectProps): ReactElement => {
  const categoryList = useCategoryList();

  // Converts the category to options for the select
  const categoryOptions = useMemo(() => {
    const categoryGroups: Record<string, SelectOption<string>[]> = {};

    categoryList.forEach((category: ICategory) => {
      const group = category.subject ?? "";

      // Filter groups to show (always keep those with no group)
      if (groupShown && group !== "" && group !== groupShown) {
        return;
      }

      if (!categoryGroups[group]) {
        categoryGroups[group] = [];
      }
      categoryGroups[group].push(fromCategoryToOption(category));
    });

    const groups = Object.entries(categoryGroups).map(fromGroupToGroupOptions);
    putNoGroupFirst(groups);
    return groups;
  }, [categoryList, groupShown]);

  // Converts the current selected values to options for the select
  const selectedCategories = useMemo(
    () =>
      categoryList
        .filter((category: ICategory) =>
          currentSelected?.includes(category._id)
        )
        .map(fromCategoryToOption),
    [categoryList, currentSelected]
  );

  const styles: StylesConfig<SelectOption<string>, true> = createSelectStyle<
    string,
    string,
    true
  >({ rounded });

  return (
    <Select<SelectOption<string>, true, GroupBase<SelectOption<string>>>
      isClearable
      isMulti
      className="text-dark"
      options={categoryOptions}
      id="categoryIds"
      name="categoryIds"
      value={selectedCategories}
      onChange={onChange}
      aria-label="Catégories"
      placeholder="Catégories"
      styles={styles}
      hideSelectedOptions
    />
  );
};

export default CategorySelect;
