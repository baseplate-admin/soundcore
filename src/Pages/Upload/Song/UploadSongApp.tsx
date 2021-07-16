import './scss/uploadsongapp.scoped.scss';

import { Fragment, useState, useCallback } from 'react';

import { FileError, FileRejection, useDropzone } from 'react-dropzone';
import { ApplicationName } from '../../routing';
import {
    IoCloseCircleOutline,
    IoCloudDoneOutline,
    IoCloudOfflineOutline,
    IoCloudUploadOutline,
} from 'react-icons/io5';
import { BsFileEarmarkArrowUp } from 'react-icons/bs';
import { useUpload } from '../../../Hooks/Upload/MusicUpload';
import logo from '../../../Assets/Images/brand_logo.png';
import prettyBytes from 'pretty-bytes';
import { useEffect } from 'react';

interface IUploadFiles {
    file: File;
    errors: FileError[];
}

export const UploadSongApp = () => {
    const [MusicUploadSingle] = useUpload();

    const [uploadDone, setUploadDone] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [formHasErroredFile, setFormHasErroredFile] = useState(false);

    const [doneArray, setDoneArray] = useState<Array<object>>([]);
    const [erroredFiles, setErroredFiles] = useState<IUploadFiles[]>([]);
    const [files, setFiles] = useState<IUploadFiles[]>([]);
    const [totalSongSize, setTotalSongSize] = useState(0);

    const onDelete = (file: File) => {
        setFiles((currentFile) => {
            return currentFile.filter(
                (fileWrapper) => fileWrapper.file !== file
            );
        });
        setTotalSongSize((currentValue) => currentValue - file.size);
        // ExtractAlbumArtFromStream(file);
    };

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
        },
        []
    );

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
    });

    useEffect(() => {
        if (isUploading && erroredFiles.length !== 0) {
            setFormHasErroredFile(true);
        }
    }, [isUploading, erroredFiles]);

    useEffect(() => {
        if (isUploading && doneArray.length === files.length) {
            setUploadDone(true);
        }
    }, [doneArray, files, isUploading]);

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

    const mappedSongs = files.map((file) => {
        return (
            <div className="box item-box">
                <div className="columns song-item is-mobile">
                    <div className="column is-narrow">
                        <BsFileEarmarkArrowUp
                            color="white"
                            style={{ height: 32, width: 32 }}
                        />
                    </div>
                    <div className="column">
                        <nav className="level is-mobile">
                            <div className="level-item has-text-centered info_level">
                                <div>
                                    <p className="heading song_name">
                                        {file.file.name}
                                    </p>
                                    <p className="heading">
                                        Size : {prettyBytes(file.file.size)}
                                    </p>
                                </div>
                            </div>
                        </nav>
                    </div>
                    <div className="column is-narrow">
                        <IoCloseCircleOutline
                            onClick={() => {
                                onDelete(file.file);
                            }}
                            style={{
                                height: 20,
                                width: 20,
                            }}
                            color="white"
                        />
                    </div>
                </div>
            </div>
        );
    });

    const mappedErrorFiles = erroredFiles.map((file) => {
        return (
            <div className="box item-box">
                <div className="columns song-item is-mobile">
                    <div className="column is-narrow">
                        <BsFileEarmarkArrowUp
                            color="white"
                            style={{ height: 32, width: 32 }}
                        />
                    </div>
                    <div className="column">
                        <nav className="level is-mobile">
                            <div className="level-item has-text-centered info_level">
                                <div>
                                    <p className="heading song_name">
                                        {file.file.name}
                                    </p>
                                    <p className="heading">
                                        Size : {prettyBytes(file.file.size)}
                                    </p>
                                </div>
                            </div>
                        </nav>
                    </div>
                    <div className="column is-narrow">
                        <IoCloseCircleOutline
                            onClick={() => {
                                onDelete(file.file);
                            }}
                            style={{
                                height: 20,
                                width: 20,
                            }}
                            color="white"
                        />
                    </div>
                </div>
            </div>
        );
    });

    return (
        <>
            <Fragment>
                <title>{ApplicationName} | Upload Songs</title>
            </Fragment>
            <section className="hero  is-fullheight upload-hero">
                {/* <!-- Hero head: will stick at the top --> */}
                <div className="hero-head">
                    <nav className="navbar">
                        <div className="container">
                            <div className="navbar-brand">
                                <span className="navbar-item">
                                    <img
                                        src={logo}
                                        alt=""
                                        className="brand-logo "
                                    />
                                </span>
                            </div>
                        </div>
                    </nav>
                </div>

                {/* <!-- Hero content: will be in the middle --> */}
                <div className="hero-body">
                    <div className="container has-text-centered">
                        <div className="columns is-centered is-desktop">
                            <div className="column is-half-desktop is-full-mobile is-narrow-tablet">
                                <div className="columns is-mobile is-centered">
                                    <div className="column">
                                        <div className="box upload-box">
                                            <div
                                                className={`${
                                                    uploadDone
                                                        ? 'is-hidden'
                                                        : ''
                                                }`}
                                            >
                                                <div
                                                    className={`${
                                                        files.length === 0
                                                            ? ''
                                                            : 'is-hidden'
                                                    }`}
                                                >
                                                    <div className="hero">
                                                        <div className="hero-body">
                                                            <div className="container">
                                                                <div className="is-justify-content-center file is-large is-boxed has-name">
                                                                    <label className="file-label">
                                                                        <input
                                                                            type="file"
                                                                            name="file_field"
                                                                            className="file-input"
                                                                            id="file_input"
                                                                            {...getInputProps()}
                                                                        />
                                                                        <span
                                                                            className="file-cta"
                                                                            {...getRootProps()}
                                                                        >
                                                                            <span className="file-icon">
                                                                                <IoCloudUploadOutline
                                                                                    style={{
                                                                                        transform:
                                                                                            'scale(1.8)',
                                                                                    }}
                                                                                    color="white"
                                                                                />
                                                                            </span>
                                                                            <span className="file-label">
                                                                                Upload
                                                                                File
                                                                            </span>
                                                                        </span>
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div
                                                        className={`hero upload-hero-wrapper ${
                                                            !formHasErroredFile &&
                                                            files.length !== 0
                                                                ? ''
                                                                : 'is-hidden'
                                                        }`}
                                                    >
                                                        <div
                                                            className="upload-hero"
                                                            {...getRootProps()}
                                                        >
                                                            <input
                                                                type="file"
                                                                name="file_field"
                                                                className="file-input"
                                                                id="file_input"
                                                                {...getInputProps()}
                                                            />
                                                            {mappedSongs}
                                                        </div>
                                                        <div className="columns is-mobile is-centered ">
                                                            <div className="column is-narrow">
                                                                <p className="heading is-size-7 ">
                                                                    <span className="total_song">
                                                                        Total
                                                                        Songs:{' '}
                                                                        {
                                                                            files.length
                                                                        }
                                                                    </span>
                                                                </p>
                                                            </div>
                                                            <div className="column" />
                                                            <div className="column is-narrow">
                                                                <p className="heading">
                                                                    <span className="total_size">
                                                                        {' '}
                                                                        Size :{' '}
                                                                        {prettyBytes(
                                                                            totalSongSize
                                                                        )}
                                                                    </span>
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="columns is-mobile is-centered">
                                                            <div className="column is-narrow">
                                                                <div className="control">
                                                                    <div
                                                                        className="box"
                                                                        style={{
                                                                            backgroundColor:
                                                                                'transparent',
                                                                        }}
                                                                    >
                                                                        <button
                                                                            id="button"
                                                                            className="button is-rounded is-dark is-centered"
                                                                            onClick={
                                                                                handleSubmit
                                                                            }
                                                                        >
                                                                            Upload
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Error File */}
                                            <div
                                                className={`${
                                                    formHasErroredFile
                                                        ? ''
                                                        : 'is-hidden'
                                                }`}
                                            >
                                                <div
                                                    className="box"
                                                    style={{
                                                        backgroundColor:
                                                            'transparent',
                                                        boxShadow: 'none',
                                                    }}
                                                >
                                                    <IoCloudOfflineOutline
                                                        style={{
                                                            transform:
                                                                'scale(3)',
                                                        }}
                                                        color="white"
                                                    />
                                                </div>
                                                <div
                                                    className="box"
                                                    style={{
                                                        backgroundColor:
                                                            'transparent',
                                                        boxShadow: 'none',
                                                    }}
                                                >
                                                    <p className="file_uploaded_text">
                                                        {' '}
                                                        Failed Upload{' '}
                                                    </p>
                                                    <p className="file_uploaded_text header">
                                                        {' '}
                                                        Failed Files :{' '}
                                                        {erroredFiles.length}
                                                    </p>
                                                    {mappedErrorFiles}
                                                </div>
                                            </div>
                                            {/* Complete file */}
                                            {console.log(formHasErroredFile)}
                                            <div
                                                className={`${
                                                    !formHasErroredFile &&
                                                    doneArray.length !== 0
                                                        ? ''
                                                        : 'is-hidden'
                                                }`}
                                            >
                                                <div
                                                    className="box"
                                                    style={{
                                                        boxShadow: 'none',
                                                        backgroundColor:
                                                            'transparent',
                                                    }}
                                                >
                                                    <p className="file_uploaded">
                                                        <div
                                                            className="box"
                                                            style={{
                                                                boxShadow:
                                                                    'none',
                                                                backgroundColor:
                                                                    'transparent',
                                                            }}
                                                        >
                                                            <IoCloudDoneOutline
                                                                style={{
                                                                    transform:
                                                                        'scale(3)',
                                                                }}
                                                                color="white"
                                                            />
                                                        </div>
                                                        <div
                                                            className="box"
                                                            style={{
                                                                boxShadow:
                                                                    'none',
                                                                backgroundColor:
                                                                    'transparent',
                                                            }}
                                                        >
                                                            <span className="file_uploaded_text is-size-4">
                                                                Files Uploaded
                                                            </span>
                                                            <div
                                                                className="box"
                                                                style={{
                                                                    backgroundColor:
                                                                        'transparent',
                                                                    boxShadow:
                                                                        'none',
                                                                }}
                                                            >
                                                                <span className="heading file_uploaded_text">
                                                                    Total Size:{' '}
                                                                    {prettyBytes(
                                                                        totalSongSize
                                                                    )}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <!-- Hero footer: will stick at the bottom --> */}
                <div className="hero-foot">
                    <nav className="tabs">
                        <div className="container">
                            <span className="project-name is-size-7">
                                &#169; Project {ApplicationName}
                            </span>
                        </div>
                    </nav>
                </div>
            </section>
        </>
    );
};
