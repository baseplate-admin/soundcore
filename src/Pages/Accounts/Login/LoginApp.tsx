// React Import
import { Fragment, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
// Main SCSS import
import './scss/LoginApp.scoped.scss';

// Spring For animation
import { useSpring, animated } from 'react-spring';

// TippyJS import for Form Error Showing
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional
import 'tippy.js/dist/backdrop.css';
import 'tippy.js/animations/shift-away.css';

// Yup for form validation
import * as Yup from 'yup';

// Icons import
import {
    IoEyeOffOutline,
    IoEyeOutline,
    IoPersonCircleOutline,
} from 'react-icons/io5';
import { MdLockOutline } from 'react-icons/md';

import { Link } from 'react-router-dom';
import { ApplicationName, RoutingPath } from '../../routing';
import { useAppDispatch, useAppSelector } from '../../../Hooks/Store/hooks';
import {
    addLoginFormValues,
    clearLoginFormValues,
    selectLoginFormState,
} from './LoginSlice';

import { useAuth } from '../../../Hooks/Auth/LoginHook';
import {
    randomSpinnerPicker,
    SpinnerComponent,
} from '../../../Components/Spinners/Spinners';
import { useFormik } from 'formik';

export const LoginPage = () => {
    const [Login] = useAuth();
    const dispatch = useAppDispatch();

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

    const loginSchema = Yup.object().shape({
        username: Yup.string()
            .required('Username is required.')
            .min(0)
            .max(50, 'Username must be less than 50 characters'),
        password: Yup.string()
            .required('Password is required.')
            .min(8, 'Password must be more than 8 characters')
            .max(1024, 'Password must be less than 1024 characters'),
    });

    useEffect(() => {
        if (loginFormState.isSuccess) {
            setModalShown(false);
        }
    }, [loginFormState.isSuccess]);

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
            setSpinner(randomSpinnerItem.toString());
            if (!errors.username && !errors.password) {
                setModalShown(true);
            }

            dispatch(clearLoginFormValues());
            const username = values.username;
            const password = values.password;

            dispatch(addLoginFormValues({ username, password }));
            Login();
        },
    });
    return (
        <Fragment>
            <Helmet>
                <title> {ApplicationName} | Login </title>
            </Helmet>
            <form onSubmit={handleSubmit}>
                <div className="items field is-horizontal">
                    <div className="field-body">
                        <div className="field">
                            <Tippy
                                offset={[0, 9]}
                                theme="attention"
                                placement="top"
                                content={errors.username}
                                visible={errors.username ? true : false}
                            >
                                <p className="control is-expanded has-icons-left">
                                    <input
                                        type="text"
                                        name="username"
                                        onChange={handleChange}
                                        className="input "
                                        placeholder="Username"
                                        required
                                    />
                                    <span className="icon is-small is-left">
                                        <IoPersonCircleOutline
                                            style={{
                                                transform: 'scale(1.5)',
                                            }}
                                            color="white"
                                        />
                                    </span>
                                </p>
                            </Tippy>
                        </div>
                    </div>
                </div>
                <div className="items field is-horizontal">
                    <div className="field-body">
                        <div className="field">
                            <Tippy
                                theme="attention"
                                placement="top"
                                content={errors.password}
                                visible={errors.password ? true : false}
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
                                        className="input "
                                        placeholder="Password"
                                        required
                                    />
                                    <span className="icon is-small is-left">
                                        <MdLockOutline
                                            style={{
                                                transform: 'scale(1.5)',
                                            }}
                                            color="white"
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
                                                    color="white"
                                                />
                                            ) : (
                                                <IoEyeOffOutline
                                                    style={{
                                                        transform: 'scale(1.5)',
                                                    }}
                                                    color="white"
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
                <div className="items columns is-mobile is-centered">
                    <div className="column is-narrow">
                        <div className="control">
                            <button
                                id="button"
                                className="button is-rounded is-dark is-centered"
                            >
                                Sign in
                            </button>
                        </div>
                    </div>
                </div>
                <div className="level">
                    <div className="level-left">
                        <div className="level-item is-size-7">
                            <span className="has-text-link">
                                <Link
                                    to={RoutingPath.FORGET_PASSWORD_PAGE}
                                    className="href_tag"
                                >
                                    Forgot password?
                                </Link>
                            </span>
                        </div>
                    </div>
                    <div className="level-right">
                        <div className="level-item is-size-7 ">
                            <p className="new_here_tag">
                                New here? &nbsp;
                                <span className="has-text-link">
                                    <Link
                                        to={RoutingPath.REGISTER_PAGE}
                                        className="href_tag"
                                    >
                                        Register an account
                                    </Link>
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className={`modal ${modalShown ? 'is-active' : ''}`}>
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
                                    <div className="columns is-centered">
                                        <div className="column is-narrow">
                                            <SpinnerComponent type={spinner} />
                                        </div>
                                    </div>
                                    {/* <div className="columns is-centered">
                                    <div className="column is-narrow">
                                        <p
                                            className="subtitle"
                                            style={{
                                                color: '#e2dfda',
                                                fontFamily: 'Nunito',
                                            }}
                                        >
                                            Logging In
                                        </p>
                                    </div>
                                </div> */}
                                </animated.div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </Fragment>
    );
};
