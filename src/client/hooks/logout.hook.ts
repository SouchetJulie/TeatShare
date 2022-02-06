import axios from "axios";
import { useRouter } from "next/router";
import React from "react";

import { useAppDispatch } from "@hooks/store-hook";
import { resetUser } from "@stores/user.store";
import { addAlert } from "@stores/alert.store";
import { ApiResponse } from "@typing/api-response.interface";

export const useLogout = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const logout: React.MouseEventHandler<HTMLElement> = (event) => {
    event.preventDefault();
    event.stopPropagation();

    axios
      .post<ApiResponse>("/api/user/logout")

      .then(() => {
        dispatch(resetUser());
        dispatch(
          addAlert({
            message: "Déconnecté",
            success: true,
            ttl: 1500,
          })
        );
        router.push("/");
      })

      .catch(() => {
        dispatch(
          addAlert({
            message: "Déconnexion échouée.",
            success: false,
          })
        );
      });
  };

  return logout;
};
