import { IUserPublic } from "@typing/user.interface";

export const getUsername = (user?: IUserPublic) =>
  `${user?.firstName ?? ""} ${user?.lastName ?? ""}`.trim() ||
  user?.email ||
  "";
