import { getLessons } from "@client/services/lesson.service";
import { getAxiosErrorMessage } from "@client/utils/get-axios-error.utils";
import DashBoardCard from "@components/dashboard/Card";
import LastPosts from "@components/dashboard/LastPosts";
import { useAppDispatch } from "@hooks/store-hook";
import { addAlert } from "@stores/alert.store";
import styles from "@styles/dashboard/dashboard.module.scss";
import { ApiErrorResponse, ApiResponse } from "@typing/api-response.interface";
import { ILesson } from "@typing/lesson.interface";
import { IUserPublic } from "@typing/user.interface";
import { AxiosError } from "axios";
import { FunctionComponent, useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

interface DashboardProps {
  user: IUserPublic | undefined;
}

const Dashboard: FunctionComponent<DashboardProps> = ({
  user,
}: DashboardProps) => {
  const dispatch = useAppDispatch();
  const [lessons, setLessons] = useState<ILesson[]>([]);

  // Fetch the lessons if user is defined
  useEffect(() => {
    let isSubscribed: boolean = true;

    let success = true;
    let message = "Impossible de récupérer la liste des leçons";

    if (user?._id) {
      getLessons({ author: user._id })
        .then((response: ApiResponse<{ lessons: ILesson[] }>) => {
          if (!isSubscribed) return;

          if (!response.success) success = false;
          else setLessons(response.data?.lessons ?? []);
        })
        .catch((reason: AxiosError<ApiErrorResponse>) => {
          if (!isSubscribed) return;
          success = false;
          message += ` : ${getAxiosErrorMessage(reason)}`;
        })
        .finally(() => {
          if (!success)
            dispatch(addAlert({ ttl: 5000, message, success: false }));
        });
    }

    return () => {
      isSubscribed = false;
    };
  }, [user?._id]);

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
