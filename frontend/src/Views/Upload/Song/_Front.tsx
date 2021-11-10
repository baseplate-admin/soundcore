import { Fragment } from 'react';
import { createUseStyles } from 'react-jss';
import { ImFileMusic } from 'react-icons/im';
import { UploadSongVariables } from './variables';
import { IconColor } from '../../../Config/Colors/Icons';

interface IFrontPageChildComponentProps {
    getRootProps: Function;
    getInputProps: Function;
}

export const FrontPageChildComponent = (
    props: IFrontPageChildComponentProps
) => {
    const classes = useStyle();
    return (
        <Fragment {...props?.getRootProps()}>
            <section className="hero">
                <div className="hero-body">
                    <div className="container">
                        <div className="is-justify-content-center file is-large is-boxed has-name">
                            <label
                                className={`file-label ${classes?.['file-label']}`}
                            >
                                <input
                                    type="file"
                                    name="file_field"
                                    {...props?.getInputProps()}
                                />
                                <span
                                    className={`file-cta ${classes?.['file-cta']}`}
                                >
                                    <span className="file-icon">
                                        <i>
                                            <ImFileMusic
                                                color={IconColor?.WHITE_ICON}
                                                style={{
                                                    transform: 'scale(1.5)',
                                                }}
                                            />
                                        </i>
                                    </span>
                                    <span
                                        className={`is-size-5 file-label ${classes?.['file-label']}`}
                                    >
                                        <br />

                                        <p>Upload </p>
                                    </span>
                                </span>
                            </label>
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    );
};

const useStyle = createUseStyles({
    file: {
        transform: 'translateY(-0.8em)',
    },
    'file-label': { color: `${UploadSongVariables?.mainFontColor} !important` },
    'file-cta': {
        backgroundColor: UploadSongVariables?.uploadHeroColor,
        color: UploadSongVariables?.mainFontColor,
        border: `2px dotted ${UploadSongVariables?.uploadHeroBorderColor} !important`,
        transition: '0.3s',

        '&:hover': {
            backgroundColor: `${UploadSongVariables?.heroHoverColor} !important`,
            borderColor: 'transparent',
            color: '#e2dfda',
        },
    },
});
