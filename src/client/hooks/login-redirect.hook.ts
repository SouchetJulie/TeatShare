import { useAppDispatch, useAppSelector } from "@hooks/store-hook";
import { addAlert } from "@stores/alert.store";
import { selectAuthenticatedUser } from "@stores/user.store";
import { IUserPublic } from "@typing/user.interface";
import { useRouter } from "next/router";
import { useEffect } from "react";

/**
 * Hook for blocking access to a page when unauthenticated.
 * Redirects to `/user/login` in that case.
 *
 * @return {IUserPublic | undefined} Returns the current user if authenticated, or undefined.
 */
export const useLoginRedirect = (): IUserPublic | undefined => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectAuthenticatedUser);

  useEffect(() => {
    if (!user) {
      router.push("/user/login");
      dispatch(
        addAlert({
          message: "Il faut se connecter pour accéder à cette page.",
          success: false,
          ttl: 3000,
        })
      );
    }
  }, [user]);

  return user;
};
