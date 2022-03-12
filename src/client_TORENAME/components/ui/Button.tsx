import { FunctionComponent } from "react";

interface Props {
  customClassName: string;
}

const Button: FunctionComponent<Props> = ({ customClassName }) => {
  return (
    <>
      <button className={`${customClassName && customClassName}`}></button>;
    </>
  );
};
export default Button;
