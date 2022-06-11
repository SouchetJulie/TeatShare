import { useAppDispatch, useAppSelector } from "@hooks/store-hook";
import { selectAuthenticatedUser, setUser } from "@stores/user.store";
import axios, { AxiosResponse } from "axios";
import { ApiResponse } from "@typing/api-response.interface";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { IUserPublic } from "@typing/user.interface";

export const useAutoLogin = (): IUserPublic | undefined => {
  const currentUser: IUserPublic | undefined = useAppSelector(
    selectAuthenticatedUser
  );
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    // If already logged in, redirect away from auth pages
    if (currentUser) {
      if (router.route === "/user/login" || router.route === "/user/signup") {
        router.back();
      }
      return;
    }

    // Else, get current session
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
            console.warn("La session a expirée");
          }
        }
      )
      .catch(() => console.warn("Erreur autologin"));
  }, [currentUser, dispatch, router]);

  return currentUser;
};
