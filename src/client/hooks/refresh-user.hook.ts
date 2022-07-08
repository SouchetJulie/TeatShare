import { useAppDispatch } from "@hooks/store-hook";
import { setUser } from "@stores/user.store";
import { ApiResponse } from "@typing/api-response.interface";
import { IUserPublic } from "@typing/user.interface";
import axios, { AxiosResponse } from "axios";
import { useCallback } from "react";

/**
 * Refresh the user in store.
 *
 * @return {VoidFunction} Refresh function.
 */
export const useRefreshUser = (): VoidFunction => {
  const dispatch = useAppDispatch();

  return useCallback(() => {
    axios
      .get<ApiResponse<{ user: IUserPublic }>>("/api/user/login")
      .then(
        ({
          data: response,
        }: AxiosResponse<ApiResponse<{ user: IUserPublic }>>) => {
          if (response.success) {
            console.log(
              `Auto logging de l'utilisateur ${response.data?.user.email}`
            );
            dispatch(setUser(response.data?.user));
          } else {
            console.warn("La session a expiré");
          }
        }
      )
      .catch(() => console.warn("Erreur rafraîchissement utilisateur"));
  }, []);
};
