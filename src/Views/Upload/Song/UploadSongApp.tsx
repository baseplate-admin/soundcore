import './scss/UploadSongApp.scss';
import './scss/UploadSongApp.scoped.scss';

import { Fragment, useState, useCallback, useRef, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import { useUpload } from '../../../Hooks/Upload/MusicUpload';

import { FileError, FileRejection, useDropzone } from 'react-dropzone';
import { ApplicationName } from '../../../Routes';

import { IoCloseCircleOutline } from 'react-icons/io5';
import { BsFileEarmarkArrowUp } from 'react-icons/bs';

import prettyBytes from 'pretty-bytes';
import { getAlbumArtFromBlob } from '../../../Helpers/ExtractAlbumArt';

// Child Components
import { PromiseSuccessChildComponent } from './Components/PromiseSuccess/PromiseSuccess';
import { MainUploadChildComponent } from './Components/MainUpload/MainUpload';
import { PromiseErrorChildComponent } from './Components/PromiseError/PromiseError';
import { PromiseLoaderChildComponent } from './Components/PromiseLoader/PromiseLoader';
import { FrontPageChildComponent } from './Components/Front/Front';

interface IUploadFiles {
    file: File;
    errors: FileError[];
}

export const UploadSongPage = () => {
    const imageRefArray = useRef([]);
    const uploadBoxRef = useRef<HTMLDivElement>(null);

    const [MusicUploadSingle] = useUpload();

    const [isFileDropped, setIsFileDropped] = useState(false);
    const [uploadDone, setUploadDone] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    const [doneArray, setDoneArray] = useState<Array<object>>([]);
    const [erroredFiles, setErroredFiles] = useState<IUploadFiles[]>([]);
    const [files, setFiles] = useState<IUploadFiles[]>([]);
    const [totalSongSize, setTotalSongSize] = useState(0);

    useEffect(() => {
        if (isUploading && doneArray.length === files.length) {
            setUploadDone(true);
        }
    }, [doneArray, files, isUploading]);

    const uploadBoxStyle = useSpring({
        width: uploadBoxRef.current?.clientWidth,
        minWidth: isFileDropped ? 650 : 490,
    });

    const onDrop = useCallback(
        (acceptedFiles: File[], rejectedFile: FileRejection[]) => {
            // Do something with the files

            acceptedFiles.forEach((file) => {
                const binarySize = file.size;
                setTotalSongSize((currentValue) => currentValue + binarySize);
            });

            const mappedAcceptedFiles = acceptedFiles.map((file) => ({
                file,
                errors: [],
            }));
            const mappedRejectedFiles = rejectedFile.map((r) => ({
                ...r,
            }));
            setFiles((currentFiles) => [
                ...currentFiles,
                ...mappedAcceptedFiles,
                ...mappedRejectedFiles,
            ]);
            if (!isFileDropped) {
                setIsFileDropped(true);
            }
        },
        [isFileDropped]
    );

    const handleSubmit = async () => {
        files.forEach(async (file) => {
            try {
                const data = await MusicUploadSingle(file.file);

                switch (data.status) {
                    case 201: {
                        setDoneArray((currentFiles) => [...currentFiles, file]);
                        break;
                    }
                    case 400: {
                        setErroredFiles((currentFiles) => [
                            ...currentFiles,
                            file,
                        ]);
                        break;
                    }
                    default: {
                        break;
                    }
                }
            } catch {
                setErroredFiles((currentFiles) => [...currentFiles, file]);
            }
        });
        setIsUploading(true);
    };
    const onDelete = (file: File) => {
        setFiles((currentFile) => {
            return currentFile.filter(
                (fileWrapper) => fileWrapper.file !== file
            );
        });
        setTotalSongSize((currentValue) => currentValue - file.size);
    };

    const addRef = (el: never) => {
        if (el && !imageRefArray.current.includes(el)) {
            imageRefArray.current.push(el);
        }
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
    });

    const mappedSongs = files.map((file, index) => {
        getAlbumArtFromBlob(file.file, index, imageRefArray);
        return (
            <>
                <div
                    className="box item-box"
                    style={{ backgroundColor: 'transparent' }}
                >
                    <article className="media song-item">
                        <figure className="media-left">
                            <figure
                                className="image is-48x48"
                                style={{
                                    transform:
                                        'translateY(10px) translateX(15px)',
                                }}
                            >
                                <img
                                    className="is-rounded"
                                    alt=""
                                    src=""
                                    ref={addRef}
                                />
                            </figure>
                        </figure>
                        <div className="media-content">
                            <div className="content">
                                <p className=" has-text-centered">
                                    <span className="title is-size-6 song_name file_uploaded_text">
                                        {file.file.name}
                                    </span>
                                    <span className="heading file_uploaded_text song_item_size">
                                        Size : {prettyBytes(file.file.size)}
                                    </span>
                                </p>
                            </div>
                        </div>
                        <div className="media-right">
                            <IoCloseCircleOutline
                                color="white"
                                onClick={() => {
                                    onDelete(file.file);
                                }}
                                style={{
                                    transform:
                                        'translateY(20px) translateX(-10px) scale(1.7)',
                                }}
                            />
                        </div>
                    </article>
                </div>
            </>
        );
    });

    const mappedErrorFiles = erroredFiles.map((file) => {
        return <></>;
    });

    return (
        <Fragment>
            <Fragment>
                <title>{ApplicationName} | Upload Songs</title>
            </Fragment>
            <Fragment>
                {/* If Flase Show upload box */}
                {/* Default False */}
                {isFileDropped ? (
                    <Fragment>
                        {!isUploading ? (
                            // if file is uploading hide this element
                            <Fragment>
                                <MainUploadChildComponent
                                    mappedSongs={mappedSongs}
                                    getInputProps={getInputProps}
                                    getRootProps={getRootProps}
                                    fileLength={files.length}
                                    totalSongSize={totalSongSize}
                                    handleSubmit={handleSubmit}
                                />
                            </Fragment>
                        ) : (
                            <Fragment>
                                {/* On upload Done Show the Error Or success page.
                                Current State should be false,
                                Layman's term : True : Show promise page,  False: Show Spinners */}
                                {uploadDone ? (
                                    <Fragment>
                                        {erroredFiles.length === 0 ? (
                                            <Fragment>
                                                {/* If Errored File Length is less than 0,and Upload is not Done . Show this element */}
                                                {/* This means this Div has Success Promise */}
                                                <PromiseSuccessChildComponent
                                                    fileLength={files.length}
                                                    totalSongSize={
                                                        totalSongSize
                                                    }
                                                />
                                            </Fragment>
                                        ) : (
                                            <Fragment>
                                                {/* If Errored File Length is greater than 0, and Upload is Not Done . Show this element.  */}
                                                {/* This means this Div has errored files */}
                                                <PromiseErrorChildComponent />
                                            </Fragment>
                                        )}
                                    </Fragment>
                                ) : (
                                    <Fragment>
                                        {/* Show A Loader When FIles Are Uploading */}
                                        <PromiseLoaderChildComponent />
                                    </Fragment>
                                )}
                            </Fragment>
                        )}
                    </Fragment>
                ) : (
                    <Fragment>
                        <FrontPageChildComponent
                            getInputProps={getInputProps}
                            getRootProps={getRootProps}
                        />
                    </Fragment>
                )}
            </Fragment>
        </Fragment>
    );
};
