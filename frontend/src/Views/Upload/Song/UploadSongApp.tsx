import prettyBytes from 'pretty-bytes';

import { UploadSongVariables } from './variables';

import { Fragment, useState, useCallback, useEffect } from 'react';
import { useMusicUpload } from '../../../Hooks/Upload/Hooks';

import { createUseStyles } from 'react-jss';
import { FileError, FileRejection, useDropzone } from 'react-dropzone';
import { ApplicationName } from '../../../Config/App';

import { IoCloseCircleOutline } from 'react-icons/io5';
import { BsFileEarmarkArrowUp } from 'react-icons/bs';

// Child Components
import { PromiseSuccessChildComponent } from './Components/PromiseSuccess/PromiseSuccess';
import { MainUploadChildComponent } from './Components/MainUpload/MainUpload';
import { PromiseErrorChildComponent } from './Components/PromiseError/PromiseError';
import { PromiseLoaderChildComponent } from './Components/PromiseLoader/PromiseLoader';
import { FrontPageChildComponent } from './Components/Front/Front';
import { ImFileMusic } from 'react-icons/im';

interface IUploadFiles {
    file: File;
    errors: FileError[];
}

export const UploadSongPage = () => {
    const classes = useStyles();

    const [MusicUploadSingle] = useMusicUpload();

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
                setUploadDone(true);
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

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
    });

    const mappedSongs = files?.map((file, index) => {
        return (
            <Fragment>
                <div
                    key={index}
                    className={`box ${classes['item-box']}`}
                    style={{ backgroundColor: 'transparent' }}
                >
                    <article className={`media ${classes['song-item']}`}>
                        <figure className="media-left">
                            <figure
                                className="image is-48x48"
                                style={{
                                    transform:
                                        'translateY(20px) translateX(20px)',
                                }}
                            >
                                <ImFileMusic
                                    color="white"
                                    style={{ transform: 'scale(1.5)' }}
                                />
                            </figure>
                        </figure>
                        <div className="media-content">
                            <div className="content">
                                <p className=" has-text-centered">
                                    <span
                                        className={`title is-size-6 ${classes.file_uploaded_text} ${classes.song_name}`}
                                    >
                                        {file.file.name}
                                    </span>
                                    <span
                                        className={`heading  ${classes.song_item_size} ${classes.file_uploaded_text}`}
                                    >
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
            </Fragment>
        );
    });

    const mappedErrorFiles = erroredFiles?.map((file) => {
        return (
            <Fragment>
                <div
                    className={`box ${classes['item-box']}`}
                    style={{ backgroundColor: 'transparent' }}
                >
                    <article className={`media ${classes['song-item']}`}>
                        <figure className="media-left">
                            <figure
                                className="image is-48x48"
                                style={{
                                    transform:
                                        'translateY(10px) translateX(15px)',
                                }}
                            >
                                <BsFileEarmarkArrowUp
                                    color="white"
                                    className={classes.upload_icon}
                                    style={{ transform: 'scale(2)' }}
                                />
                            </figure>
                        </figure>
                        <div className="media-content">
                            <div className="content">
                                <p className=" has-text-centered">
                                    <span
                                        className={`title is-size-6 ${classes.file_uploaded_text} ${classes.song_name}`}
                                    >
                                        {file.file.name}
                                    </span>
                                    <span
                                        className={`heading  ${classes.song_item_size} ${classes.file_uploaded_text}`}
                                    >
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
            </Fragment>
        );
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
                            //    On upload Done Show the Error Or success page.
                            //    Current State should be false,
                            //    Layman's term : True : Show promise page,  False: Show Spinners
                            <Fragment>
                                {uploadDone ? (
                                    <Fragment>
                                        {erroredFiles.length === 0 ? (
                                            //  If Errored File Length is less than 0,and Upload is Done . Show this element
                                            //  This means this Div has Success Promise
                                            <Fragment>
                                                <PromiseSuccessChildComponent
                                                    fileLength={files.length}
                                                    totalSongSize={
                                                        totalSongSize
                                                    }
                                                />
                                            </Fragment>
                                        ) : (
                                            // If Errored File Length is greater than 0, and Upload is Done . Show this element.
                                            // This means this Div has errored files
                                            <Fragment>
                                                <PromiseErrorChildComponent
                                                    errorFiles={
                                                        mappedErrorFiles
                                                    }
                                                />
                                            </Fragment>
                                        )}
                                    </Fragment>
                                ) : (
                                    // Show A Loader When FIles Are Uploading
                                    <Fragment>
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

const useStyles = createUseStyles({
    song_name: {
        width: 200,
        transform: 'translateY(8px)',
        display: 'inline-block',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        fontFamily: "'Roboto' !important",

        '@media screen and (max-width: 767px)': {
            width: '140px !important',
        },
    },

    'item-box': {
        backgroundColor: 'transparent',
        marginBottom: '0 !important',
        marginTop: '0 !important',

        '&:not(:first-of-type :last-of-type)': {
            paddingBottom: '0.2em !important',
        },

        '&:first-of-type': {
            marginTop: ' 0.5em !important',
        },
        '&:last-of-type': {
            marginBottom: '0.5em !important',
        },
    },
    'song-item': {
        height: 65,
        backgroundColor: UploadSongVariables.uploadHeroColor,
        border: `1px solid ${UploadSongVariables.uploadHeroBorderColor} !important`,
        borderRadius: 3,
    },
    file_uploaded_text: {
        color: UploadSongVariables.mainFontColor,
    },
    song_item_size: {
        transform: 'translateY(-10px)',
    },
    upload_icon: {
        transform: 'translate(3px)',
    },
});
