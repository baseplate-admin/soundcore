import './scss/uploadsongapp.scoped.scss';

import { Fragment, useState, useCallback } from 'react';

import { useDropzone } from 'react-dropzone';
import { ApplicationName } from '../../routing';

import { IoCloudUploadOutline } from 'react-icons/io5';

export const UploadSongApp = () => {
    const [isUploaded, setIsUploaded] = useState(false);
    const [musicFiles, setMusicFiles] = useState(Object);

    const onDrop = useCallback((acceptedFiles) => {
        acceptedFiles.forEach((file: any) => {
            const reader = new FileReader();

            reader.onabort = () => console.error('Can"t Read Music Files');
            reader.onerror = () => console.error('Music Files Reading Failed');
            reader.onload = () => {
                // Do whatever you want with the file contents
                setMusicFiles(
                    acceptedFiles.map((file: any) => {
                        Object.assign(file, {
                            preview: URL.createObjectURL(file),
                        });
                    })
                );

                const binaryStr = reader.result;

                console.log(binaryStr);
            };
            reader.readAsArrayBuffer(file);
        });
    }, []);
    const { getRootProps, getInputProps } = useDropzone({ onDrop });
    return (
        <>
            <Fragment>
                <title>{ApplicationName} | Upload Songs</title>
            </Fragment>
            <div
                {...getRootProps()}
                className={`hero-body ${isUploaded ? 'is-hidden' : ''}`}
            >
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
                            <span className="file-cta">
                                <span className="file-icon">
                                    <IoCloudUploadOutline
                                        style={{ transform: 'scale(1.8)' }}
                                        color="white"
                                    />
                                    {/* <ion-icon className="upload__icon md hydrated" name="cloud-upload-outline" style="transform: scale(1.8); color: rgb(255, 255, 255);" role="img" aria-label="cloud upload outline"></ion-icon> */}
                                </span>

                                <span className="file-label">Upload File</span>
                            </span>
                        </label>
                    </div>
                </div>
            </div>
        </>
    );
};
