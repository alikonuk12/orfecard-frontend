import React from "react";
import { Document, pdfjs, Page } from "react-pdf";
import "./styles.css";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PDFViewer = ({ pdf }) => {
    return (
        <Document file={pdf}>
            <Page pageNumber={1} />
        </Document>
    );
}

export default PDFViewer;
