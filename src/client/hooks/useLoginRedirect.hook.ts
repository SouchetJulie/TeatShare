import {useRouter} from "next/router";
import {useEffect} from "react";
import {useSelector} from "react-redux";

import {useAppDispatch} from "@hooks/store-hook";
import {addAlert} from "@stores/alert.store";
import {selectAuthenticatedUser} from "@stores/user.store";
import {IUserPublic} from "@typing/user.interface";

/**
 * Hook for blocking access to a page when unauthenticated.
 * Redirects to `/user/login` in that case.
 * Returns the current user if authenticated, or null.
 *
 * @return {IUserPublic}
 */
export const useLoginRedirect = (): IUserPublic => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useSelector(selectAuthenticatedUser);

  useEffect(() => {
    if (!user) {
      router.push("/user/login");
      dispatch(
        addAlert({
          message: "Il faut se connecter pour accéder à cette page.",
          success: false,
          ttl: 4000
        })
      );
    }
  }, [user]);

  return user;
};
