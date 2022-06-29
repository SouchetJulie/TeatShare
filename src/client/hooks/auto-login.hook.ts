import { useRefreshUser } from "@hooks/refresh-user.hook";
import { useAppSelector } from "@hooks/store-hook";
import { selectAuthenticatedUser } from "@stores/user.store";
import { IUserPublic } from "@typing/user.interface";
import { useRouter } from "next/router";
import { useEffect } from "react";

export const useAutoLogin = (): IUserPublic | undefined => {
  const currentUser: IUserPublic | undefined = useAppSelector(
    selectAuthenticatedUser
  );
  const refreshUser = useRefreshUser();
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
    refreshUser();
  }, [currentUser, refreshUser, router]);

  return currentUser;
};
