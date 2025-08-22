import React, { useReducer, useRef, useState } from "react";

import "./FileUpload.css";

import Button from "../Button";
import Alert from "../Alert";
import { alertReducer } from "../../reducers/alertReducer";

function FileUpload({
    multiple = false,
    uploadedFiles,
    blobs,
    removeFile,
    uploadFile,
}) {
    const inputRef = useRef(null);
    const [alert, dispatchAlert] = useReducer(alertReducer, {});

    const selectFileInput = () => {
        inputRef.current.click();
    };

    const fileInputOnChange = () => {
        const selectedFiles = inputRef.current.files;

        let hasFileNameExist = false;
        let hasFileSizeNotAllowed = false;

        const files = Array.from(selectedFiles).filter((file) => {
            let foundFile = uploadedFiles.find((uploadedFile) => {
                return uploadedFile.name == file.name;
            });
            if (foundFile) {
                hasFileNameExist = true;
            }

            let fileSizeAllowed = 1024 * 1024 * 50;
            let isFileSizeAllowed = file.size <= fileSizeAllowed;
            if (!isFileSizeAllowed) {
                hasFileSizeNotAllowed = true;
            }
            return !foundFile && isFileSizeAllowed;
        });

        if (selectedFiles.length != files.length) {
            inputRef.current.value = "";
            dispatchAlert({
                type: "open",
                alert: {
                    message:
                        hasFileNameExist && hasFileSizeNotAllowed
                            ? "Some files were not uploaded because they already exist and exceed the size limit 50mb."
                            : hasFileNameExist
                            ? "Some files were not uploaded because a file with the same name already exists."
                            : "Some files were not uploaded because they exceed the size limit 50mb.",
                    type: "danger",
                    timeout: setTimeout(() => {
                        dispatchAlert({ type: "close" });
                    }, 3000),
                },
            });
        }

        uploadFile(files);
        inputRef.current.value = "";
    };

    const getDownloadLink = (fileId) => {
        return (
            blobs &&
            blobs.find((blob) => blob.id == fileId) &&
            blobs.find((blob) => blob.id == fileId).downloadLink
        );
    };

    return (
        <div className="form-file">
            <input
                type="file"
                multiple={multiple}
                ref={inputRef}
                onChange={() => fileInputOnChange()}
            ></input>
            <Button size="small" onClick={() => selectFileInput()}>
                Browse File
            </Button>
            <ul className="files">
                {Array.from(uploadedFiles).map((file, key) => (
                    <li key={key}>
                        {!file.uploading ? (
                            <>
                                <a
                                    href={getDownloadLink(file.id)}
                                    download={file.name}
                                >
                                    {getDownloadLink(file.id) && (
                                        <svg
                                            fill="currentColor"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 640 640"
                                        >
                                            <path d="M352 96C352 78.3 337.7 64 320 64C302.3 64 288 78.3 288 96L288 306.7L246.6 265.3C234.1 252.8 213.8 252.8 201.3 265.3C188.8 277.8 188.8 298.1 201.3 310.6L297.3 406.6C309.8 419.1 330.1 419.1 342.6 406.6L438.6 310.6C451.1 298.1 451.1 277.8 438.6 265.3C426.1 252.8 405.8 252.8 393.3 265.3L352 306.7L352 96zM160 384C124.7 384 96 412.7 96 448L96 480C96 515.3 124.7 544 160 544L480 544C515.3 544 544 515.3 544 480L544 448C544 412.7 515.3 384 480 384L433.1 384L376.5 440.6C345.3 471.8 294.6 471.8 263.4 440.6L206.9 384L160 384zM464 440C477.3 440 488 450.7 488 464C488 477.3 477.3 488 464 488C450.7 488 440 477.3 440 464C440 450.7 450.7 440 464 440z" />
                                        </svg>
                                    )}
                                    {file.name}
                                </a>
                                <Button
                                    type="icon"
                                    size="small"
                                    onClick={() =>
                                        removeFile(inputRef, key, [file.name])
                                    }
                                >
                                    <svg
                                        fill="currentColor"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 640 640"
                                    >
                                        <path d="M232.7 69.9C237.1 56.8 249.3 48 263.1 48L377 48C390.8 48 403 56.8 407.4 69.9L416 96L512 96C529.7 96 544 110.3 544 128C544 145.7 529.7 160 512 160L128 160C110.3 160 96 145.7 96 128C96 110.3 110.3 96 128 96L224 96L232.7 69.9zM128 208L512 208L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 208zM216 272C202.7 272 192 282.7 192 296L192 488C192 501.3 202.7 512 216 512C229.3 512 240 501.3 240 488L240 296C240 282.7 229.3 272 216 272zM320 272C306.7 272 296 282.7 296 296L296 488C296 501.3 306.7 512 320 512C333.3 512 344 501.3 344 488L344 296C344 282.7 333.3 272 320 272zM424 272C410.7 272 400 282.7 400 296L400 488C400 501.3 410.7 512 424 512C437.3 512 448 501.3 448 488L448 296C448 282.7 437.3 272 424 272z"></path>
                                    </svg>
                                </Button>
                            </>
                        ) : (
                            <p className="blinking">Uploading</p>
                        )}
                    </li>
                ))}
            </ul>
            <Alert value={alert}></Alert>
        </div>
    );
}

export default FileUpload;
