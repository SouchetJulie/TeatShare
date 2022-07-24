import {
  createSelectStyle,
  SelectOption,
} from "@components/ui/select-option.utils";
import { useCategoryList } from "@hooks/category-list.hook";
import { ICategory } from "@typing/category.interface";
import { FunctionComponent, ReactElement } from "react";
import Select, { MultiValue, StylesConfig } from "react-select";

interface CategorySelectProps {
  currentSelected?: string[];
  onChange: (newValues: MultiValue<{ value: string; label: string }>) => void;
  rounded?: boolean;
}

const fromCategoryToOption = (category: ICategory): SelectOption<string> => ({
  value: category._id,
  label: category.label,
});

const CategorySelect: FunctionComponent<CategorySelectProps> = ({
  currentSelected,
  onChange,
  rounded = false,
}: CategorySelectProps): ReactElement => {
  const categories = useCategoryList();

  const categoryOptions = categories.map(fromCategoryToOption);
  const selectedCategories = categories
    .filter((category: ICategory) => currentSelected?.includes(category._id))
    .map(fromCategoryToOption);

  const styles: StylesConfig<SelectOption<string>, true> = createSelectStyle<
    string,
    true
  >({ rounded });

  return (
    <Select
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
    />
  );
};

export default CategorySelect;
