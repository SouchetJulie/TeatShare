import React, { FunctionComponent } from "react";
import { BookmarkCheck, BookmarkCheckFill } from "react-bootstrap-icons";

interface LessonBookmarkProps {
  isBookmarked?: boolean;
}

const LessonBookmark: FunctionComponent<LessonBookmarkProps> = ({
  isBookmarked,
}: LessonBookmarkProps): JSX.Element => {
  return (
    <>
      {isBookmarked ? (
        <BookmarkCheckFill color="gold" size={30} />
      ) : (
        <BookmarkCheck color="black" size={30} />
      )}
    </>
  );
};

export default LessonBookmark;
