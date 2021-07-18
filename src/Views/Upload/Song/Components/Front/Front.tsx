import './scss/Front.scoped.scss';
import { Fragment } from 'react';
import { ImFileMusic } from 'react-icons/im';

interface IFrontPageChildComponentProps {
    getRootProps: Function;
    getInputProps: Function;
}

export const FrontPageChildComponent = (
    props: IFrontPageChildComponentProps
) => {
    return (
        <Fragment>
            <section className="hero">
                <div className="hero-body">
                    <div className="container">
                        <div className="is-justify-content-center file is-large is-boxed has-name">
                            <label
                                className="file-label"
                                {...props.getRootProps()}
                            >
                                <input
                                    type="file"
                                    name="file_field"
                                    {...props.getInputProps()}
                                />
                                <span className="file-cta">
                                    <span className="file-icon">
                                        <i>
                                            <ImFileMusic
                                                color="white"
                                                style={{
                                                    transform: 'scale(1.5)',
                                                }}
                                            />
                                        </i>
                                    </span>
                                    <span className="file-label is-size-5">
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
