import './scss/uploadsongapp.scoped.scss';

import { Fragment, useState, useCallback } from 'react';

import { FileError, FileRejection, useDropzone } from 'react-dropzone';
import { ApplicationName } from '../../routing';
import { IoCloseCircleOutline, IoCloudUploadOutline } from 'react-icons/io5';
import { BsFileEarmarkArrowUp } from 'react-icons/bs';
import { useUpload } from '../../../Hooks/Upload/MusicUpload';
import { useFormik } from 'formik';
import logo from '../../../Assets/Images/brand_logo.png';
import prettyBytes from 'pretty-bytes';
import { useEffect } from 'react';

interface IUploadFiles {
    file: File;
    errors: FileError[];
}

export const UploadSongApp = () => {
    const [MusicUpload] = useUpload();

    const [files, setFiles] = useState<IUploadFiles[]>([]);
    const [totalSongSize, setTotalSongSize] = useState(0);

    const { handleSubmit, handleChange, errors } = useFormik({
        initialValues: {
            files: File,
        },
        onSubmit(values) {
            // Success
        },
    });
    const onDelete = (file: File) => {
        setFiles((currentFile) => {
            return currentFile.filter(
                (fileWrapper) => fileWrapper.file !== file
            );
        });
        // ExtractAlbumArtFromStream(file);
    };

    const onDrop = useCallback(
        (acceptedFiles: File[], rejectedFile: FileRejection[]) => {
            acceptedFiles.forEach((file) => {
                // Do something with the files
                const mappedFiles = acceptedFiles.map((file) => ({
                    file,
                    errors: [],
                }));
                // setTotalSongSize(totalSongSize + )
                setFiles((currentFiles) => [
                    ...currentFiles,
                    ...mappedFiles,
                    ...rejectedFile,
                ]);
            });
        },
        []
    );

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
    });

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
                    <div
                        className="column is-narrow"
                        onClick={() => {
                            onDelete(file.file);
                        }}
                    >
                        <IoCloseCircleOutline
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
                                            <form
                                                onSubmit={handleSubmit}
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
                                                                        onChange={
                                                                            handleChange
                                                                        }
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
                                            </form>
                                            <form onSubmit={handleSubmit}>
                                                <div
                                                    className={`hero upload-hero-wrapper ${
                                                        files.length !== 0
                                                            ? ''
                                                            : 'is-hidden'
                                                    }`}
                                                    {...getRootProps()}
                                                >
                                                    <input
                                                        type="file"
                                                        name="file_field"
                                                        className="file-input"
                                                        id="file_input"
                                                        onChange={handleChange}
                                                        {...getInputProps()}
                                                    />
                                                    <span className="upload-hero">
                                                        {mappedSongs}
                                                    </span>
                                                    <div className="columns is-mobile is-centered ">
                                                        <div className="column is-narrow">
                                                            <p className="heading is-size-7">
                                                                Total Songs:{' '}
                                                                {files.length}
                                                            </p>
                                                        </div>
                                                        <div className="column" />
                                                        <div className="column is-narrow">
                                                            <p className="heading">
                                                                {' '}
                                                                Size :{' '}
                                                                {totalSongSize}
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
                                                                    >
                                                                        Sign in
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
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
