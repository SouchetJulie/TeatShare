import { useAutoLogin } from "@hooks/auto-login.hook";
import { useRefreshUser } from "@hooks/refresh-user.hook";
import { useAppDispatch } from "@hooks/store-hook";
import { addAlert } from "@stores/alert.store";
import { ApiResponse } from "@typing/api-response.interface";
import axios, { AxiosError, AxiosResponse } from "axios";
import React, { FunctionComponent } from "react";
import { getAxiosErrorMessage } from "../../client/utils/get-axios-error.utils";

const index: FunctionComponent = () => {
  const user = useAutoLogin();
  const dispatch = useAppDispatch();
  const refreshUser = useRefreshUser();

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const form = event.target as HTMLFormElement;
    const formData: FormData = new FormData(form);
    const data: Record<string, any> = {};
    for (const [key, value] of formData) {
      data[key] = value;
    }

    axios
      .patch<ApiResponse>("/api/user", data)
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

  return user ? (
    <div>
      <h3>TODO for debug</h3>
      <table>
        {Object.entries(user).map(([key, value]) => {
          return (
            <tr>
              <td>{key}</td>
              <td>{Array.isArray(value) ? value.join(", ") : value}</td>
            </tr>
          );
        })}
      </table>
      <hr />
      <h3>Modifier</h3>
      <form onSubmit={onSubmit}>
        <input name="email" placeholder={user.email ?? "email"} />
        <input name="firstName" placeholder={user.firstName ?? "firstName"} />
        <input name="lastName" placeholder={user.lastName ?? "lastName"} />
        <input name="avatar" type="file" />

        <button type="submit">Envoyer</button>
      </form>
    </div>
  ) : (
    <></>
  );
};

export default index;
