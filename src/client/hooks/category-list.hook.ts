import { useAppDispatch } from "@hooks/store-hook";
import { addAlert } from "@stores/alert.store";
import { ApiResponse } from "@typing/api-response.interface";
import { ICategory } from "@typing/category.interface";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { getAxiosErrorMessage } from "../utils/get-axios-error.utils";

/**
 * Fetches the list of categories from the API and returns it in an array.
 * @return {ICategory[]} List of category.
 */
export const useCategoryList = (): ICategory[] => {
  const dispatch = useAppDispatch();
  const [categoryList, setCategoryList] = useState<ICategory[]>([]);

  useEffect(() => {
    axios
      .get<ApiResponse<{ categories: ICategory[] }>>("/api/category/")
      .then(
        ({
          data: response,
        }: AxiosResponse<ApiResponse<{ categories: ICategory[] }>>) => {
          if (response.success) {
            setCategoryList(response.data!.categories);
          } else {
            dispatch(
              addAlert({
                success: false,
                ttl: 2000,
                message: "La récupération des catégories a échoué.",
              })
            );
          }
        }
      )
      .catch((e: AxiosError) => {
        dispatch(
          addAlert({
            success: false,
            ttl: 2000,
            message: `La récupération des catégories a échoué : ${getAxiosErrorMessage(
              e
            )}`,
          })
        );
      });
  }, []);

  return categoryList;
};
