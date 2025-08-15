import React, { useRef } from "react";

import "./FileUpload.css";

import Button from "../Button";

function FileUpload({
    multiple = false,
    uploadedFiles,
    setUploadedFiles,
    blobs,
    removeFileFromDB,
    uploadFile,
}) {
    const inputRef = useRef(null);

    const selectFileInput = () => {
        inputRef.current.click();
    };

    const removeFile = (key, fileName) => {
        const filesCopy = [...uploadedFiles];
        filesCopy.splice(key, 1);
        setUploadedFiles(filesCopy);

        removeFileFromDB && removeFileFromDB(fileName);
    };

    return (
        <div className="form-file">
            <input
                type="file"
                multiple={multiple}
                ref={inputRef}
                onChange={() => uploadFile(inputRef)}
            ></input>
            <Button size="small" onClick={() => selectFileInput()}>
                Browse File
            </Button>
            <ul className="files">
                {Array.from(uploadedFiles).map((file, key) => (
                    <li key={key}>
                        <a
                            href={
                                blobs &&
                                blobs.find((blob) => blob.id == file.id) &&
                                blobs.find((blob) => blob.id == file.id)
                                    .downloadLink
                            }
                            download={file.name}
                        >
                            {file.name}
                        </a>
                        <button
                            type="button"
                            onClick={() => removeFile(key, file.name)}
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default FileUpload;
