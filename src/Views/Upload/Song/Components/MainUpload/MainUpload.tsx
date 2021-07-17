import prettyBytes from 'pretty-bytes';
import { Fragment } from 'react';
import { IoAddCircleOutline } from 'react-icons/io5';

interface IMainUploadChildComponentProps {
    mappedSongs: Array<Object>;
    getRootProps: Function;
    getInputProps: Function;
    fileLength: number;
    totalSongSize: number;
    handleSubmit: Function;
}

export const MainUploadChildComponent = (
    props: IMainUploadChildComponentProps
) => {
    return (
        <Fragment>
            <section className="hero">
                <div className="upload-hero">
                    <span>
                        <div className="container">
                            <div className="is-justify-content-center">
                                {props.mappedSongs}
                            </div>
                        </div>
                    </span>
                </div>
                <div
                    className="box"
                    style={{
                        backgroundColor: 'transparent',
                        boxShadow: 'none',
                    }}
                >
                    <div className="columns is-mobile">
                        <div className="column">
                            <nav className="level">
                                <div
                                    className="level-item has-text-centered "
                                    {...props.getRootProps()}
                                >
                                    <div className="columns is-mobile ">
                                        <div
                                            className="column is-narrow"
                                            style={{
                                                paddingLeft: 0,
                                                paddingRight: 0,
                                            }}
                                        >
                                            <IoAddCircleOutline
                                                color="white"
                                                style={{
                                                    transform: 'scale(1.5)',
                                                }}
                                            />
                                            <input
                                                type="file"
                                                name="file_field"
                                                {...props.getInputProps()}
                                            />
                                        </div>
                                        <div className="column is-narrow">
                                            <p className="subtitle file_uploaded_text is-size-6    ">
                                                Select files to upload
                                                <input
                                                    type="file"
                                                    name="file_field"
                                                    {...props.getInputProps()}
                                                />
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="level-item has-text-centered">
                                    <table
                                        style={{
                                            overflow: 'hidden',
                                            backgroundColor: 'transparent',
                                        }}
                                        className="table"
                                    >
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <span className="heading file_uploaded_text">
                                                        Total Songs
                                                    </span>
                                                </td>
                                                <td>
                                                    <span className="heading file_uploaded_text">
                                                        :
                                                    </span>
                                                </td>
                                                <td>
                                                    <span className="heading file_uploaded_text">
                                                        {props.fileLength}
                                                    </span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <span className="heading file_uploaded_text">
                                                        Buffer
                                                    </span>
                                                </td>
                                                <td>
                                                    <span className="heading file_uploaded_text">
                                                        :
                                                    </span>
                                                </td>
                                                <td>
                                                    <span className="heading file_uploaded_text">
                                                        {prettyBytes(
                                                            props.totalSongSize
                                                        )}
                                                    </span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
                <div className="columns is-mobile is-centered">
                    <div className="column is-narrow">
                        <button
                            onClick={() => {
                                props.handleSubmit();
                            }}
                            className="button is-rounded is-centered"
                        >
                            Upload
                        </button>
                    </div>
                </div>
            </section>
        </Fragment>
    );
};
