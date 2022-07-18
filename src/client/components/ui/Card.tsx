import { FunctionComponent, PropsWithChildren } from "react";

interface OwnProps {}

type Props = PropsWithChildren<OwnProps>;

const Card: FunctionComponent<Props> = (props) => {
  return <div className="cardContainer">{props.children}</div>;
};
export default Card;
