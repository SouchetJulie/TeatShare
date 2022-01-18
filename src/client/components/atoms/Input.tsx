import { FunctionComponent } from "react";

interface Props {
  id: string;
  name: string;
  placeholder: string;
  type: string;
}

const Input: FunctionComponent<Props> = ({ id, name, placeholder, type }) => {
  return (
    <>
      <input
        id={id}
        name={name}
        placeholder={placeholder}
        type={type}
        required
      ></input>
      ;
    </>
  );
};
export default Input;
