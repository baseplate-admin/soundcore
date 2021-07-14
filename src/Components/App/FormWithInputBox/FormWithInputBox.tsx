// Type Import
import { FC } from 'react';
// SCSS import
import './scss/FormWithInputBox.scoped.scss';
import './scss/FormWithInputBox.tippy.scss';

// Logo Import
import loginLogo from '../../../Assets/Images/brand_logo.png';

interface FormWithInputBoxComponentPropsInterface {
    children: FC;
}

export const FormWithInputBoxComponent = (
    props: FormWithInputBoxComponentPropsInterface
) => {
    return (
        <>
            <section className="hero login-hero is-fullheight">
                <div className="hero-body">
                    <div className="container">
                        <div className="columns is-centered is-desktop">
                            <div className="column is-half-desktop is-full-mobile is-narrow-tablet">
                                <div className="icon-box box">
                                    <div className="columns is-mobile is-centered">
                                        <div className="column is-narrow">
                                            <img
                                                src={loginLogo}
                                                alt=""
                                                width="150"
                                                height="40"
                                                style={{
                                                    userSelect: 'none',
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="box login-box">
                                    {<props.children />}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};
