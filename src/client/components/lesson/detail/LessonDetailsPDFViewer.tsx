import { ILesson } from "@typing/lesson.interface";
import { PDFDocumentProxy } from "pdfjs-dist";
import { FunctionComponent, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

interface LessonDetailsPDFProps {
  lesson?: ILesson;
  viewerWidth: number;
}

const LessonDetailsPDFViewer: FunctionComponent<LessonDetailsPDFProps> = ({
  lesson,
  viewerWidth,
}: LessonDetailsPDFProps): JSX.Element => {
  const [numPages, setNumPages] = useState<number>(1);
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

  return (
    <>
      <Document file={fileURL} onLoadSuccess={onDocumentLoadSuccess}>
        {getPages(numPages, viewerWidth)}
      </Document>
    </>
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
