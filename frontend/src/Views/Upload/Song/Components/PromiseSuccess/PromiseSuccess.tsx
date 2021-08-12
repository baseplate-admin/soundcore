import prettyBytes from 'pretty-bytes';
import { Fragment } from 'react';
import { IoCloudDoneOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { RoutingPath } from '../../../../../Config/Routes';
import { createUseStyles } from 'react-jss';
import { UploadSongVariables } from '../../variables';
import { IconColor } from '../../../../../Config/Colors/Icons';

interface ISuccessPromiseChildComponentProps {
    fileLength: number;
    totalSongSize: number;
}

export const PromiseSuccessChildComponent = (
    props: ISuccessPromiseChildComponentProps
) => {
    const classes = useStyle();
    
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
                            color={IconColor?.WHITE_ICON}
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
                                        <span
                                            className={`heading has-text-centered ${classes?.file_uploaded_text}`}
                                        >
                                            Total Songs &nbsp;
                                        </span>
                                    </td>
                                    <td>
                                        <span
                                            className={`heading has-text-centered ${classes?.file_uploaded_text}`}
                                        >
                                            :
                                        </span>
                                    </td>
                                    <td>
                                        <span
                                            className={`heading has-text-centered ${classes?.file_uploaded_text}`}
                                        >
                                            {props?.fileLength}
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <span
                                            className={`heading ${classes?.file_uploaded_text}`}
                                        >
                                            Total Payload &nbsp;
                                        </span>
                                    </td>
                                    <td>
                                        <span
                                            className={`heading ${classes?.file_uploaded_text}`}
                                        >
                                            :
                                        </span>
                                    </td>
                                    <td>
                                        <span
                                            className={`heading has-text-centered ${classes?.file_uploaded_text}`}
                                        >
                                            &nbsp; &nbsp;
                                            {prettyBytes(props?.totalSongSize)}
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="columns is-mobile is-centered">
                        <div className="column is-narrow">
                            <Link
                                className={`${classes?.['href_tag']}`}
                                to={RoutingPath?.HOME_PAGE}
                            >
                                Return to home?
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};
const useStyle = createUseStyles({
    href_tag: {
        textDecoration: 'none',

        '&:hover': {
            color: UploadSongVariables?.tagHrefHoverColor,
        },
    },

    file_uploaded_text: {
        color: UploadSongVariables?.mainFontColor,
    },
});
