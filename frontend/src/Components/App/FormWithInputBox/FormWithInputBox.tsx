// Type Import
import { FC, Fragment } from 'react';

// Logo Import
import loginLogo from '../../../Assets/Images/brand_logo.png';
import { createUseStyles } from 'react-jss';
import { formWithInputBoxVariables } from './variables';

interface FormWithInputBoxComponentPropsInterface {
    children: FC;
}

export const FormWithInputBoxComponent = (
    props: FormWithInputBoxComponentPropsInterface
) => {
    const classes = useStyles();
    return (
        <Fragment>
            <section
                className={`hero is-fullheight ${classes?.['login-hero']}`}
            >
                <div className="hero-body">
                    <div className="container">
                        <div className="columns is-centered is-desktop">
                            <div className="column is-half-desktop is-full-mobile is-narrow-tablet">
                                <div className={`box ${classes?.['icon-box']}`}>
                                    <div className="columns is-mobile is-centered">
                                        <div className="column is-narrow">
                                            <img
                                                src={loginLogo}
                                                alt=""
                                                width="150"
                                                height="40"
                                                className={
                                                    classes?.['no-select']
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className={`box ${classes?.['login-box']}`}
                                >
                                    {<props.children />}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    );
};

const useStyles = createUseStyles({
    'login-hero': {
        backgroundColor: formWithInputBoxVariables?.pageBackgroundColor,
    },
    'icon-box': {
        backgroundColor: 'transparent',
    },
    'login-box': {
        backgroundColor: formWithInputBoxVariables?.loginBoxColor,
        border: `1px solid ${formWithInputBoxVariables?.loginHeroBorderColor}`,
    },
    'no-select': {
        userSelect: 'none',
    },
});
