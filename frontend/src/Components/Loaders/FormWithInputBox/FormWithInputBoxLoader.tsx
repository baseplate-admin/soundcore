import { Fragment } from 'react';
import { createUseStyles } from 'react-jss';
import { formWithInputBoxVariables } from '../../App/FormWithInputBox/variables';

export const FormWithInputBoxLoader = () => {
    const classes = useStyles();

    return (
        <Fragment>
            <section className={`hero is-fullheight ${classes?.login_hero}`}>
                <div className="hero-body">
                    <div className="container">
                        <div className="columns is-centered is-desktop">
                            <div className="column is-half-desktop is-full-mobile is-narrow-tablet">
                                <div className={`box ${classes?.icon_box}`}>
                                    <div className="columns is-mobile is-centered">
                                        <div className="column is-narrow">
                                            {/* <img
                                                // src={loginLogo}
                                                alt=""
                                                width="150"
                                                height="40"
                                                style={{
                                                    userSelect: 'none',
                                                }}
                                            /> */}
                                            {/* <div
                                                style={{
                                                    width: 150,
                                                    height: 40,
                                                    background: '#0a0a0a',
                                                }}
                                            /> */}
                                        </div>
                                    </div>
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
    login_hero: {
        backgroundColor: formWithInputBoxVariables.pageBackgroundColor,
    },
    icon_box: { backgroundColor: 'transparent' },
});
