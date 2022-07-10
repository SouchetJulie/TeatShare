import { ApiResponse } from "@typing/api-response.interface";
import { ICategory } from "@typing/category.interface";
import axios from "axios";
import { FunctionComponent, useEffect, useState } from "react";
import Badge from "react-bootstrap/Badge";
import styles from "./category.module.scss";

interface Props {
  id: string;
}

const CategoryBadge: FunctionComponent<Props> = ({ id }) => {
  const [category, setCategory] = useState<ICategory | undefined>(undefined);

  useEffect(() => {
    axios
      .get<ApiResponse<{ category: ICategory }>>(`/api/category/${id}`)
      .then(({ data: response }) => {
        if (response.success) {
          setCategory(response.data?.category);
        }
      });
  }, []);

  return <Badge className={styles.badge}>{category?.label ?? ""}</Badge>;
};

export default CategoryBadge;
