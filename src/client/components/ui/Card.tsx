import { FunctionComponent } from "react";
interface Props {}

const Card: FunctionComponent<Props> = (props) => {
  return <div className="cardContainer">{props.children}</div>;
};
export default Card;
