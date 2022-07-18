import { useRefreshUser } from "@hooks/refresh-user.hook";
import { useAppDispatch } from "@hooks/store-hook";
import { addAlert } from "@stores/alert.store";
import { ApiResponse } from "@typing/api-response.interface";
import axios, { AxiosError, AxiosResponse } from "axios";
import React from "react";
import { getAxiosErrorMessage } from "../../utils/get-axios-error.utils";

/**
 * Returns a onSubmit handler for the profile page form.
 * @return {(event: React.FormEvent<HTMLFormElement>)} onSubmit handler
 */
export const useProfileOnSubmit = (): ((
  event: React.FormEvent<HTMLFormElement>
) => void) => {
  const dispatch = useAppDispatch();
  const refreshUser = useRefreshUser();

  return (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget as HTMLFormElement;
    const formData: FormData = new FormData(form);
    // Clean-up the fields
    const entriesToDelete: string[] = [];
    // can't use forEach, since entries() returns an iterator instead of an array
    for (const [key, value] of formData.entries()) {
      if (value === "" || value === undefined || (value as File).size === 0)
        // remove empty fields
        entriesToDelete.push(key);
    }
    entriesToDelete.forEach((key: string) => formData.delete(key));

    axios
      .patch<ApiResponse>("/api/user", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // for file upload
        },
      })
      .then(({ data: response }: AxiosResponse<ApiResponse>) => {
        if (response.success) {
          dispatch(
            addAlert({
              success: true,
              message: "Profil mis à jour !",
              ttl: 2000,
            })
          );
          refreshUser();
        } else {
          dispatch(
            addAlert({
              success: false,
              message: "Mise à jour échouée",
              ttl: 2000,
            })
          );
        }
      })
      .catch((e: AxiosError) =>
        dispatch(
          addAlert({
            success: false,
            message: `Mise à jour échouée: ${getAxiosErrorMessage(e)}`,
            ttl: 2000,
          })
        )
      );
  };
};
