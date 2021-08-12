import prettyBytes from 'pretty-bytes';
import { Fragment } from 'react';
import { IoAddCircleOutline } from 'react-icons/io5';
import { createUseStyles } from 'react-jss';
import { UploadSongVariables } from '../../variables';
import { animated, useSpring } from 'react-spring';
import { useMediaQuery } from 'react-responsive';
import useWindowDimensions from '../../../../../Hooks/Responsive/Hooks';
import { IconColor } from '../../../../../Config/Colors/Icons';

interface IMainUploadChildComponentProps {
    mappedSongs: Object[];
    getRootProps: Function;
    getInputProps: Function;
    fileLength: number;
    totalSongSize: number;
    handleSubmit: Function;
}

export const MainUploadChildComponent = (
    props: IMainUploadChildComponentProps
) => {
    const classes = useStyles();

    const { height } = useWindowDimensions();

    const isMobile = useMediaQuery({
        query: '(max-width: 767px)',
    });

    const uploadItem = useSpring({
        maxHeight: isMobile ? (height * 30) / 100 : (height * 50) / 100, // 30 vw mobile | 50 vw web
    });

    return (
        <Fragment>
            <section className="hero">
                <animated.div
                    className={`${classes?.['upload-hero']}`}
                    style={uploadItem}
                >
                    <span>
                        <div className="container">
                            <div className="is-justify-content-center">
                                {props?.mappedSongs}
                            </div>
                        </div>
                    </span>
                </animated.div>
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
                                    {...props?.getRootProps()}
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
                                                color={IconColor?.WHITE_ICON}
                                                style={{
                                                    transform: 'scale(1.5)',
                                                }}
                                            />
                                            <input
                                                type="file"
                                                name="file_field"
                                                {...props?.getInputProps()}
                                            />
                                        </div>
                                        <div className="column is-narrow">
                                            <p
                                                className={`subtitle is-size-6 ${classes?.['file_uploaded_text']}`}
                                            >
                                                Select files to upload
                                                <input
                                                    type="file"
                                                    name="file_field"
                                                    {...props?.getInputProps()}
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
                                                    <span
                                                        className={`heading ${classes?.['file_uploaded_text']}`}
                                                    >
                                                        Total Songs
                                                    </span>
                                                </td>
                                                <td>
                                                    <span
                                                        className={`heading ${classes?.['file_uploaded_text']}`}
                                                    >
                                                        :
                                                    </span>
                                                </td>
                                                <td>
                                                    <span
                                                        className={`heading ${classes?.['file_uploaded_text']}`}
                                                    >
                                                        {props?.fileLength}
                                                    </span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <span
                                                        className={`heading ${classes?.['file_uploaded_text']}`}
                                                    >
                                                        Buffer
                                                    </span>
                                                </td>
                                                <td>
                                                    <span
                                                        className={`heading ${classes?.['file_uploaded_text']}`}
                                                    >
                                                        :
                                                    </span>
                                                </td>
                                                <td>
                                                    <span
                                                        className={`heading ${classes?.['file_uploaded_text']}`}
                                                    >
                                                        {prettyBytes(
                                                            props?.totalSongSize
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
                                props?.handleSubmit();
                            }}
                            className={`button is-rounded is-centered ${classes?.['button']}`}
                        >
                            Upload
                        </button>
                    </div>
                </div>
            </section>
        </Fragment>
    );
};

const useStyles = createUseStyles({
    button: {
        backgroundColor: UploadSongVariables?.buttonBackgroundColor,
        border: `1px solid ${UploadSongVariables?.uploadHeroBorderColor} !important`,
        color: UploadSongVariables?.mainFontColor,
        transition: '0.4s',
        fontFamily: UploadSongVariables?.buttonFont,

        '&:hover': {
            backgroundColor: UploadSongVariables?.buttonHoverBackgroundColor,
            color: UploadSongVariables?.buttonHoverFontColor,
            fontFamily: UploadSongVariables?.buttonFont,
        },
    },
    file_uploaded_text: {
        color: UploadSongVariables?.mainFontColor,
    },
    'upload-hero': {
        backgroundColor: UploadSongVariables?.pageBackgroundColor,
        // maxHeight: '50vh',
        overflowY: 'scroll',
        scrollbarWidth: 'none',

        '&::-webkit-scrollbar': {
            width: '0',
            height: '0',
        },
        // '@media screen and (max-width: 767px)': {
        //     maxHeight: '30vh !important',
        // },
    },
});
