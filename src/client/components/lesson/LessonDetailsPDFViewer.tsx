import React, { FunctionComponent, useState } from "react";
import { ILesson } from "@typing/lesson-file.interface";
// PDF VIEWER
import { Document, Page, pdfjs } from "react-pdf";
import { PDFDocumentProxy } from "pdfjs-dist";
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
  function onDocumentLoadSuccess({ numPages }: PDFDocumentProxy): void {
    setNumPages(numPages);
  }

  const fileURL: string = `https://storage.googleapis.com/${process.env.NEXT_PUBLIC_BUCKET_NAME}/${lesson?.file.filepath}`;

  return (
    <>
      <Document file={fileURL} onLoadSuccess={onDocumentLoadSuccess}>
        {setPages(numPages, viewerWidth)}
      </Document>
    </>
  );
};

export default LessonDetailsPDFViewer;

const setPages = (nbrPage: number, width: number): JSX.Element => {
  return (
    <>
      {Array.from(new Array(nbrPage), (el, index) => (
        <Page width={width} key={`page_${index + 1}`} pageNumber={index + 1} />
      ))}
    </>
  );
};
