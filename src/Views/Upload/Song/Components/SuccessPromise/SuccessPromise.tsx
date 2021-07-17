import './scss/SuccessPromise.scoped.scss';

import prettyBytes from 'pretty-bytes';
import { Fragment } from 'react';
import { IoCloudDoneOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { RoutingPath } from '../../../../../Routes';

interface ISuccessPromiseChildComponentProps {
    fileLength: number;
    totalSongSize: number;
}

export const SuccessPromiseChildComponent = (
    props: ISuccessPromiseChildComponentProps
) => {
    return (
        <Fragment>
            <div className="columns is-mobile is-centered">
                <div className="column is-narrow">
                    <div
                        className="box"
                        style={{
                            backgroundColor: 'transparent',
                            boxShadow: 'none',
                        }}
                    >
                        <IoCloudDoneOutline
                            style={{
                                transform: 'scale(4)',
                            }}
                            color="white"
                        />
                    </div>
                </div>
            </div>
            <div className="columns is-mobile is-centered">
                <div className="column is-narrow">
                    <div
                        className="box"
                        style={{
                            backgroundColor: 'transparent',
                            boxShadow: 'none',
                        }}
                    >
                        <table
                            style={{
                                backgroundColor: 'transparent',
                                overflow: 'hidden',
                            }}
                        >
                            <tbody>
                                <tr>
                                    <td>
                                        <span className="heading file_uploaded_text has-text-centered">
                                            Total Songs &nbsp;
                                        </span>
                                    </td>
                                    <td>
                                        <span className="heading file_uploaded_text has-text-centered">
                                            :
                                        </span>
                                    </td>
                                    <td>
                                        <span className="heading file_uploaded_text has-text-centered">
                                            {props.fileLength}
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <span className="heading file_uploaded_text">
                                            Total Payload &nbsp;
                                        </span>
                                    </td>
                                    <td>
                                        <span className="file_uploaded_text heading">
                                            :
                                        </span>
                                    </td>
                                    <td>
                                        <span className="heading file_uploaded_text has-text-centered">
                                            &nbsp; &nbsp;
                                            {prettyBytes(props.totalSongSize)}
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div
                        className="box"
                        style={{
                            boxShadow: 'none',
                            backgroundColor: 'transparent',
                        }}
                    >
                        <div className="columns is-mobile is-centered">
                            <div className="column is-narrow">
                                <Link
                                    className="href_tag"
                                    to={RoutingPath.HOME_PAGE}
                                >
                                    Return to home?
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};
