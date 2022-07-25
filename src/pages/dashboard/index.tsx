import DashBoardCard from "@components/dashboard/Card";
import LastPosts from "@components/dashboard/LastPosts";
import { useAutoLogin } from "@hooks/auto-login.hook";
import { useFetchLessons } from "@hooks/fetch-lessons.hook";
import { IUserPublic } from "@typing/user.interface";
import { FunctionComponent } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import styles from "../../client/styles/dashboard/dashboard.module.scss";

interface Props {}

const Dashboard: FunctionComponent<Props> = ({}: Props) => {
  const user: IUserPublic | undefined = useAutoLogin();
  const { lessons } = useFetchLessons({ author: user?._id });
  console.log(lessons && lessons);
  return user ? (
    <Container className={styles.dashboardContainer}>
      <h2 className={styles.title}>Dashboard</h2>
      <Row>
        <Col>
          <DashBoardCard user={user} />
          {/*        <DashboardComments />*/}
        </Col>
        <Col>
          <LastPosts lessons={lessons} />
        </Col>
      </Row>
    </Container>
  ) : (
    <></>
  );
};
export default Dashboard;
