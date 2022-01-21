import {useEffect, useState} from "react";
import axios, {AxiosResponse} from "axios";
import {IUserPublic} from "@typing/user.interface";
import {UserApiResponse} from "@typing/api-response.interface";

export const useUser = () => {
  const [user, setUser] = useState<IUserPublic>(null);

  useEffect(() => {
    axios.get<UserApiResponse>("/api/user/_me")
      .then((response: AxiosResponse<UserApiResponse>) => {
        if (response.data.success) {
          setUser(response.data.user);
        } else {
          setUser(null);
        }
      })
      .catch(() => setUser(null));
  }, [setUser])

  return {user, setUser}
}
