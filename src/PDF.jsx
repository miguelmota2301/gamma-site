import React from "react";

function PDFViewer({src}) {
    return(
        <div>
            <iframe
                className="pdfviewer"
                src={src}
                title="PDF Viewer"
            >
            </iframe>
        </div>
    );
}

export default PDFViewer;