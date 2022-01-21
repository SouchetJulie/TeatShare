import { useRouter } from "next/router";
import axios from "axios";
import { useEffect, useState } from "react";
import LessonPost from "@components/Lesson/LessonPost";

const IdLesson = () => {
  const router = useRouter();
  const [lesson, setlesson] = useState<any>(null);
  const [loading, setloading] = useState<boolean>(true);
  const id = router.query.IdPost;
  useEffect(() => {
    if (router.isReady) {
      axios
        .get(`/api/lesson/${id}`)
        .then((res) => {
          setlesson(res.data.lesson);
          setloading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [router.isReady]);
  console.log();
  return (
    <>{loading ? <p>Votre cours arrive</p> : <LessonPost lesson={lesson} />}</>
  );
};

export default IdLesson;
