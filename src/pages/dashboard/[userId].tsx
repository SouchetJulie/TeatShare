import { getUser } from "@client/services/user.service";
import { getAxiosErrorMessage } from "@client/utils/get-axios-error.utils";
import Dashboard from "@components/dashboard/Dashboard";
import { useAutoLogin } from "@hooks/auto-login.hook";
import { useAppDispatch } from "@hooks/store-hook";
import { addAlert } from "@stores/alert.store";
import { ApiErrorResponse } from "@typing/api-response.interface";
import { IUserPublic } from "@typing/user.interface";
import { AxiosError } from "axios";
import { NextRouter, useRouter } from "next/router";
import { FunctionComponent, useEffect, useState } from "react";

const UserDashboard: FunctionComponent = () => {
  useAutoLogin();
  const router: NextRouter = useRouter();
  const dispatch = useAppDispatch();
  const [user, setUser] = useState<IUserPublic | undefined>(undefined);

  // Fetch user from the id in the url
  useEffect(() => {
    let isSubscribed = true;

    const userId = router.query.userId;

    if (!userId) {
      return;
    }

    let success = true;
    let message = `Problème de récupération de l'utilisateur "${userId}"`;

    getUser(userId as string)
      .then(({ data: response }) => {
        if (!isSubscribed) return;

        if (response.success && !!response.data) setUser(response.data.user);
        else success = false;
      })
      .catch((e: AxiosError<ApiErrorResponse>) => {
        if (!isSubscribed) return;
        success = false;
        message += ` : ${getAxiosErrorMessage(e)}`;
      })
      .finally(() => {
        if (!success)
          dispatch(addAlert({ ttl: 5000, message, success: false }));
      });

    return (): void => {
      isSubscribed = false;
    };
  }, [router.query.userId]);

  return <Dashboard user={user} />;
};

export default UserDashboard;
