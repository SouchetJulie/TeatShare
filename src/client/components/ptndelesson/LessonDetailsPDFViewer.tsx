import React, { FunctionComponent, useState } from "react";
import { ILesson } from "@typing/lesson-file.interface";
// PDF VIEWER
import { Document, Page, pdfjs } from "react-pdf";
import { PDFDocumentProxy } from "pdfjs-dist";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

interface OwnProps {
  lesson?: ILesson;
}

const LessonDetailsPDFViewer: FunctionComponent<OwnProps> = ({
  lesson,
}: OwnProps): JSX.Element => {
  const [numPages, setNumPages] = useState<number>(1);
  const [pageNumber, setPageNumber] = useState<number>(1);
  /**
   * On load
   * @param {PDFDocumentProxy} pdfProperties Data about the downloaded pdf
   */
  function onDocumentLoadSuccess({ numPages }: PDFDocumentProxy): void {
    setNumPages(numPages);
  }

  const fileURL: string = `https://storage.googleapis.com/${process.env.NEXT_PUBLIC_BUCKET_NAME}/${lesson?.file.filepath}`;
  console.log(lesson?.file);

  return (
    <>
      <Document
        file={{
          url: fileURL,
          httpHeaders: {
            "Access-Control-Allow-Origin": "*",
          },
        }}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={1} />
      </Document>
      <p>
        Page {pageNumber} of {numPages}
      </p>
    </>
  );
};

export default LessonDetailsPDFViewer;
