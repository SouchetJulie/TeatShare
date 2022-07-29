import avatarLogo from "@assets/logos/avatar_placeholder.png";
import { getUserAvatar } from "@client/services/user.service";
import styles from "@styles/ui/avatar.module.scss";
import { IUserPublic } from "@typing/user.interface";
import Image from "next/image";
import { FunctionComponent } from "react";

interface AvatarProps {
  user: IUserPublic | undefined;
  size: number;
}

export const Avatar: FunctionComponent<AvatarProps> = ({ user, size }) => {
  const avatar = getUserAvatar(user);

  return (
    <Image
      placeholder="blur"
      blurDataURL={avatarLogo.src}
      className={styles.blockImage}
      src={avatar}
      width={`${size}px`}
      height={`${size}px`}
    />
  );
};
