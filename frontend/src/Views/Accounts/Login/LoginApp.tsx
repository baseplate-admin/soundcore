// React Import
import { Fragment, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';

import { useFormik } from 'formik';
import * as Yup from 'yup';

// Main SCSS import
import { createUseStyles } from 'react-jss';

// Spring For animation
import { useSpring, animated } from 'react-spring';

// TippyJS import for Form Error Showing
import Tippy from '@tippyjs/react';

// Icons import
import {
    IoEyeOffOutline,
    IoEyeOutline,
    IoPersonCircleOutline,
} from 'react-icons/io5';
import { MdLockOutline } from 'react-icons/md';

import { Link, useHistory } from 'react-router-dom';
import { RoutingPath } from '../../../Config/Routes';
import { ApplicationName } from '../../../Config/App';
import { useAppSelector } from '../../../Hooks/Store/Hooks';
import { selectLoginFormState } from '../../../Store/Redux/Slices/Login';

import { useAuthLogin } from '../../../Hooks/Auth/LoginHook';
import {
    randomSpinnerPicker,
    SpinnerComponent,
} from '../../../Components/Spinners/Spinners';
import { formWithInputBoxVariables } from '../../../Components/App/FormWithInputBox/variables';
import { GetJWTTokenInLocalStorage } from '../../../Functions/Helpers/LocalStorage/JWTCookie';

// Yup for form validation
import { IconColor } from '../../../Config/Colors/Icons';

export const LoginPage = () => {
    const classes = useStyles();

    const [Login] = useAuthLogin();
    const history = useHistory();

    const loginFormState = useAppSelector(selectLoginFormState);

    const [mouseIsOverEye, setMouseIsOverEye] = useState(false);
    const [isInputFocused, setIsInputFocued] = useState(false);
    const [isPasswordShown, setIsPasswordShown] = useState(false);
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);

    const [modalShown, setModalShown] = useState(false);
    const [spinner, setSpinner] = useState('');

    const handleEyeIconClick = () => {
        if (isPasswordShown) {
            setIsPasswordShown(false);
        } else if (!isPasswordShown) {
            setIsPasswordShown(true);
        }
    };

    const handlePasswordInputFocus = () => {
        setIsPasswordFocused(true);
        setIsInputFocued(true);
    };

    const handlePasswordInputBlur = () => {
        setIsInputFocued(false);
        if (!mouseIsOverEye) {
            setIsPasswordFocused(false);
        }
    };

    const handleMouseEnterEyeIcon = () => {
        setMouseIsOverEye(true);
    };

    const handleMouseLeaveEyeIcon = () => {
        if (!isInputFocused) {
            setMouseIsOverEye(false);
            setIsPasswordFocused(false);
        }
    };

    const loginSchema = Yup?.object()?.shape({
        username: Yup?.string()
            ?.required('Username is required.')
            ?.min(0)
            ?.max(50, 'Username must be less than 50 characters'),
        password: Yup?.string()
            ?.required('Password is required.')
            ?.min(8, 'Password must be more than 8 characters')
            ?.max(1024, 'Password must be less than 1024 characters'),
        // .matches(
        //     /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        //     'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character'
        // ),
    });

    useEffect(() => {
        const data = GetJWTTokenInLocalStorage();
        if (data) {
            history?.push(RoutingPath?.HOME_PAGE);
        }
    }, [history]);

    useEffect(() => {
        if (loginFormState?.promise?.success?.value) {
            history?.push(RoutingPath?.HOME_PAGE);
        }
    }, [history, loginFormState?.promise?.success?.value]);

    const modalStyle = useSpring({
        backgroundColor: '#191b1f',
        opacity: modalShown ? 1.0 : 0.0,
    });

    const { handleSubmit, handleChange, errors } = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: loginSchema,
        onSubmit(values) {
            const randomSpinnerItem = randomSpinnerPicker();
            setSpinner(randomSpinnerItem?.toString());
            if (!errors?.username && !errors?.password) {
                setModalShown(true);
            }

            const username = values?.username;
            const password = values?.password;

            Login(username, password);
        },
    });

    return (
        <Fragment>
            <Helmet>
                <title> {ApplicationName} | Login </title>
            </Helmet>
            <form onSubmit={handleSubmit}>
                <div className={`field is-horizontal ${classes?.items}`}>
                    <div className="field-body">
                        <div className="field">
                            <Tippy
                                offset={[0, 9]}
                                theme="attention"
                                placement="top"
                                content={errors?.username}
                                visible={errors?.username ? true : false}
                            >
                                <p className="control is-expanded has-icons-left">
                                    <input
                                        type="text"
                                        name="username"
                                        onChange={handleChange}
                                        className={`input ${classes?.input}`}
                                        placeholder="Username"
                                        required
                                    />
                                    <span className="icon is-small is-left">
                                        <IoPersonCircleOutline
                                            style={{
                                                transform: 'scale(1.5)',
                                            }}
                                            color={IconColor?.WHITE_ICON}
                                        />
                                    </span>
                                </p>
                            </Tippy>
                        </div>
                    </div>
                </div>
                <div className={`field is-horizontal ${classes?.items}`}>
                    <div className="field-body">
                        <div className="field">
                            <Tippy
                                theme="attention"
                                placement="top"
                                content={errors?.password}
                                visible={errors?.password ? true : false}
                            >
                                <p className="control is-expanded has-icons-left has-icons-right">
                                    <input
                                        type={
                                            !isPasswordShown
                                                ? 'password'
                                                : 'text'
                                        }
                                        onChange={handleChange}
                                        onFocus={handlePasswordInputFocus}
                                        onBlur={handlePasswordInputBlur}
                                        name="password"
                                        className={`input ${classes?.input}`}
                                        placeholder="Password"
                                        required
                                    />
                                    <span className="icon is-small is-left">
                                        <MdLockOutline
                                            style={{
                                                transform: 'scale(1.5)',
                                            }}
                                            color={IconColor?.WHITE_ICON}
                                        />
                                    </span>
                                    {isPasswordFocused ? (
                                        <span
                                            onMouseEnter={
                                                handleMouseEnterEyeIcon
                                            }
                                            onMouseLeave={
                                                handleMouseLeaveEyeIcon
                                            }
                                            className="icon is-small is-right"
                                            onClick={handleEyeIconClick}
                                        >
                                            {!isPasswordShown ? (
                                                <IoEyeOutline
                                                    style={{
                                                        transform: 'scale(1.5)',
                                                    }}
                                                    color={
                                                        IconColor?.WHITE_ICON
                                                    }
                                                />
                                            ) : (
                                                <IoEyeOffOutline
                                                    style={{
                                                        transform: 'scale(1.5)',
                                                    }}
                                                    color={
                                                        IconColor?.WHITE_ICON
                                                    }
                                                />
                                            )}
                                        </span>
                                    ) : (
                                        <></>
                                    )}
                                </p>
                            </Tippy>
                        </div>
                    </div>
                </div>
                <div
                    className={`columns is-mobile is-centered ${classes?.items}`}
                >
                    <div className="column is-narrow">
                        <div className="control">
                            <button
                                id="button"
                                type="submit"
                                className={`button is-rounded is-dark is-centered ${classes?.button}`}
                            >
                                Sign in
                            </button>
                        </div>
                    </div>
                </div>
                <div className="level">
                    <div className="level-left">
                        <div className="level-item is-size-7">
                            <span className="has-text-link heading">
                                <Link
                                    to={RoutingPath?.FORGET_PASSWORD_PAGE}
                                    className={classes?.href_tag}
                                >
                                    Forgot password?
                                </Link>
                            </span>
                        </div>
                    </div>
                    <div className="level-right">
                        <div className="level-item is-size-7 ">
                            <p className={`heading ${classes?.new_here_tag}`}>
                                New here{'? | '}
                                <span className="has-text-link">
                                    <Link
                                        to={RoutingPath?.REGISTER_PAGE}
                                        className={classes?.href_tag}
                                    >
                                        Register an account
                                    </Link>
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
                {/* If true Show Modal.
                Else show blank page */}
                {modalShown ? (
                    <div className="modal is-active">
                        <div
                            className="modal-background"
                            onClick={() => {
                                if (modalShown) {
                                    setModalShown(false);
                                }
                            }}
                        />
                        <div
                            className="modal-content"
                            style={{
                                overflow: 'hidden',
                            }}
                        >
                            <div className="columns is-mobile is-centered">
                                <div className="column is-half-desktop is-half-mobile is-narrow-tablet">
                                    <animated.div
                                        className="box"
                                        style={modalStyle}
                                    >
                                        {/* https://www.davidhu.io/react-spinners/ */}
                                        <div className="columns is-mobile is-centered">
                                            <div className="column is-narrow">
                                                <div
                                                    className={`
                                                    box 
                                                    ${classes?.['transparent-box']}`}
                                                >
                                                    <SpinnerComponent
                                                        type={spinner}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </animated.div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <Fragment></Fragment>
                )}
            </form>
        </Fragment>
    );
};
const useStyles = createUseStyles({
    input: {
        backgroundColor: `${formWithInputBoxVariables?.inputFieldColor} !important`,
        border: `1px solid ${formWithInputBoxVariables?.inputBorderColor} !important`,
        color: `${formWithInputBoxVariables?.mainFontColor} !important`,

        '&::placeholder': {
            color: formWithInputBoxVariables?.mainFontColor,
            opacity: 0.5,
            fontFamily: formWithInputBoxVariables?.inputPlaceholderFont,
        },
    },

    items: {
        paddingTop: '1em',
    },

    button: {
        backgroundColor: `${formWithInputBoxVariables?.buttonBackgroundColor} !important`,
        border: `1px solid ${formWithInputBoxVariables?.inputBorderColor} !important`,
        color: formWithInputBoxVariables?.mainFontColor,
        transition: '0.4s',
        fontFamily: formWithInputBoxVariables?.buttonFont,

        '&:hover': {
            backgroundColor: `${formWithInputBoxVariables?.buttonHoverBackgroundColor} !important`,
            color: formWithInputBoxVariables?.buttonHoverFontColor,
            fontFamily: formWithInputBoxVariables?.buttonFont,
        },
    },

    href_tag: {
        textDecoration: 'none',
        fontFamily: formWithInputBoxVariables?.tagFont,

        '&:hover': {
            color: formWithInputBoxVariables?.tagHrefHoverColor,
        },
    },

    new_here_tag: {
        fontFamily: formWithInputBoxVariables?.tagFont,
        color: formWithInputBoxVariables?.tagFontColor,
    },
    'transparent-box': {
        backgroundColor: 'transparent',
        boxShadow: 'none',
    },
});
