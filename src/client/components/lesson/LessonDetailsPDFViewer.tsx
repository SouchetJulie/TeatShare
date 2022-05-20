import React, { FunctionComponent, useEffect, useState } from "react";
import { ILesson } from "@typing/lesson-file.interface";
// PDF VIEWER
import { Document, Page, pdfjs } from "react-pdf";
import { PDFDocumentProxy } from "pdfjs-dist";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

import axios from "axios";

interface LessonDetailsPDFProps {
  lesson?: ILesson;
}

const LessonDetailsPDFViewer: FunctionComponent<LessonDetailsPDFProps> = ({
  lesson,
}: LessonDetailsPDFProps): JSX.Element => {
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
  useEffect(() => {
    if (lesson) {
      axios
        .get(fileURL, {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        })
        .then((res) => {
          console.log(res);
          // function fileToBase64() {}
        });
    }
  }, [lesson?.file]);

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
/**
 *
 // eslint-disable-next-line valid-jsdoc
 * @param {any} image
 */
export async function fileToBase64(image: any) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (value) => {
      resolve({ success: true, data: reader.result });
    };
    reader.onerror = (error) => {
      resolve({ success: false, error });
    };
    reader.readAsDataURL(image);
  });
}
