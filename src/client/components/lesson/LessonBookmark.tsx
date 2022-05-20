import React, { FunctionComponent } from "react";
import { BookmarkCheck, BookmarkCheckFill } from "react-bootstrap-icons";

interface Props {
  isBookmarked?: boolean;
}

const LessonBookmark: FunctionComponent<Props> = ({
  isBookmarked,
}: Props): JSX.Element => {
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
