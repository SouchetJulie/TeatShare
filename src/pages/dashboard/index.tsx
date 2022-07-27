import { getUser } from "@client/services/user.service";
import DashBoardCard from "@components/dashboard/Card";
import LastPosts from "@components/dashboard/LastPosts";
import { useAutoLogin } from "@hooks/auto-login.hook";
import { useFetchLessons } from "@hooks/fetch-lessons.hook";
import { ApiResponse } from "@typing/api-response.interface";
import { IUserPublic } from "@typing/user.interface";
import { AxiosResponse } from "axios";
import { useRouter } from "next/router";
import { FunctionComponent, useState } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import styles from "../../client/styles/dashboard/dashboard.module.scss";

interface Props {}

const Dashboard: FunctionComponent<Props> = ({}: Props) => {
  const [user, setUser] = useState(useAutoLogin());
  const router: any = useRouter();

  if (router.query.otherUser) {
    getUser(router.query.otherUser).then(
      ({
        data: response,
      }: AxiosResponse<ApiResponse<{ user: IUserPublic }>>) => {
        if (response.success) {
          setUser(response.data?.user);
        }
      }
    );
  }

  const { lessons } = useFetchLessons({ author: user?._id });

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
