import styles from "@styles/lesson/LessonPost.module.scss";
import { ILesson } from "@typing/lesson.interface";
import { PDFDocumentProxy } from "pdfjs-dist";
import { FunctionComponent, RefObject, useRef, useState } from "react";
import Container from "react-bootstrap/Container";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

interface LessonDetailsPDFProps {
  lesson?: ILesson;
}

const LessonDetailsPDFViewer: FunctionComponent<LessonDetailsPDFProps> = ({
  lesson,
}: LessonDetailsPDFProps): JSX.Element => {
  const [numPages, setNumPages] = useState<number>(1);
  const pdfViewerBlock: RefObject<HTMLDivElement> = useRef(null);
  /**
   * On load
   * @param {PDFDocumentProxy} pdfProperties Data about the downloaded pdf
   */
  function onDocumentLoadSuccess({
    numPages: pageNbr,
  }: PDFDocumentProxy): void {
    setNumPages(pageNbr);
  }

  const fileURL: string = `https://storage.googleapis.com/${process.env.NEXT_PUBLIC_BUCKET_NAME}/${lesson?.file.filepath}`;

  return lesson ? (
    <Container ref={pdfViewerBlock} className={styles.lessonBlock2}>
      <Document file={fileURL} onLoadSuccess={onDocumentLoadSuccess}>
        {getPages(numPages, pdfViewerBlock.current?.offsetWidth ?? 0)}
      </Document>
    </Container>
  ) : (
    <></>
  );
};

export default LessonDetailsPDFViewer;

const getPages = (nbrPage: number, width: number): JSX.Element => {
  return (
    <>
      {Array.from(new Array(nbrPage), (_el, index) => (
        <Page width={width} key={`page_${index + 1}`} pageNumber={index + 1} />
      ))}
    </>
  );
};
