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
import { selectLoginFormState } from '../../../Store/Slices/Login';

import { useAuthLogin } from '../../../Hooks/Auth/LoginHook';
import {
    randomSpinnerPicker,
    SpinnerComponent,
} from '../../../Components/Spinners/Spinners';
import { formWithInputBoxVariables } from '../../../Components/App/FormWithInputBox/variables';
import { GetJWTTokenInLocalStorage } from '../../../Functions/Helpers/LocalStorage/JWTCookie';
import {
    Block,
    Box,
    Button,
    Columns,
    Form as BulmaForm,
    Icon,
    Level,
    Modal,
} from 'react-bulma-components';

// Yup for form validation
import { IconColor } from '../../../Config/Colors/Icons';
import { randomEmoji } from '../../../Functions/Helpers/RandomPicker/RandomEmojis';

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
                <title> {ApplicationName ?? ''} | Login </title>
            </Helmet>
            <form onSubmit={handleSubmit}>
                <BulmaForm.Field className={classes?.items}>
                    <Tippy
                        offset={[0, 9]}
                        theme="attention"
                        placement="top"
                        content={errors?.username}
                        visible={errors?.username ? true : false}
                    >
                        <span>
                            <BulmaForm.Control>
                                <BulmaForm.Input
                                    type="text"
                                    name="username"
                                    onChange={handleChange}
                                    className={`input ${classes?.input}`}
                                    placeholder="Username"
                                    required
                                />
                                <Icon align="left">
                                    <IoPersonCircleOutline
                                        style={{
                                            transform: 'scale(1.5)',
                                        }}
                                        color={IconColor?.WHITE_ICON}
                                    />
                                </Icon>
                            </BulmaForm.Control>
                        </span>
                    </Tippy>
                </BulmaForm.Field>
                <BulmaForm.Field className={classes?.items}>
                    <Tippy
                        theme="attention"
                        placement="top"
                        content={errors?.password}
                        visible={errors?.password ? true : false}
                    >
                        <span>
                            <BulmaForm.Control>
                                <BulmaForm.Input
                                    type={isPasswordShown ? 'text' : 'password'}
                                    onChange={handleChange}
                                    onFocus={handlePasswordInputFocus}
                                    onBlur={handlePasswordInputBlur}
                                    name="password"
                                    className={`input ${classes?.input}`}
                                    placeholder="Password"
                                    required
                                />
                                <Icon align="left">
                                    <MdLockOutline
                                        style={{
                                            transform: 'scale(1.5)',
                                        }}
                                        color={IconColor?.WHITE_ICON}
                                    />
                                </Icon>
                                <Icon
                                    align="right"
                                    style={{ pointerEvents: 'initial' }}
                                    onMouseEnter={handleMouseEnterEyeIcon}
                                    onMouseLeave={handleMouseLeaveEyeIcon}
                                    onClick={handleEyeIconClick}
                                    className={
                                        isPasswordFocused ? '' : 'is-hidden'
                                    }
                                >
                                    {/* Eye logic */}
                                    <IoEyeOutline
                                        style={{
                                            transform: 'scale(1.5)',
                                        }}
                                        className={
                                            isPasswordShown ? 'is-hidden' : ''
                                        }
                                        color={IconColor?.WHITE_ICON}
                                    />
                                    <IoEyeOffOutline
                                        style={{
                                            transform: 'scale(1.5)',
                                        }}
                                        className={
                                            isPasswordShown ? '' : 'is-hidden'
                                        }
                                        color={IconColor?.WHITE_ICON}
                                    />
                                </Icon>
                            </BulmaForm.Control>
                        </span>
                    </Tippy>
                </BulmaForm.Field>
                <BulmaForm.Field>
                    <BulmaForm.Control>
                        <Columns
                            breakpoint="mobile"
                            centered
                            className={classes?.items}
                        >
                            <Columns.Column narrow>
                                <Button
                                    type="submit"
                                    rounded
                                    color="dark"
                                    className={classes?.button}
                                >
                                    Sign in
                                </Button>
                            </Columns.Column>
                        </Columns>
                    </BulmaForm.Control>
                </BulmaForm.Field>
                <BulmaForm.Field className={classes?.items}>
                    <BulmaForm.Control>
                        <Level>
                            <Level.Side align="left">
                                <Level.Item textSize={7}>
                                    <span className="has-text-link heading">
                                        <Link
                                            to={
                                                RoutingPath?.FORGET_PASSWORD_PAGE
                                            }
                                            className={classes?.href_tag}
                                        >
                                            Forgot password?
                                        </Link>
                                    </span>
                                </Level.Item>
                            </Level.Side>

                            <Level.Side align="right">
                                <Level.Item textSize={7}>
                                    <p
                                        className={`heading ${classes?.new_here_tag}`}
                                    >
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
                                </Level.Item>
                            </Level.Side>
                        </Level>
                    </BulmaForm.Control>
                </BulmaForm.Field>
                {/* If true Show Modal.
                Else show blank page */}

                <Modal
                    closeOnBlur={true}
                    closeOnEsc={true}
                    onClose={() => {
                        setModalShown(!modalShown);
                    }}
                    show={modalShown}
                >
                    <Modal.Content className={classes?.['no-overflow']}>
                        <Columns
                            breakpoint="mobile"
                            centered
                            // onClick={() => {
                            //     setModalShown(!modalShown);
                            // }}
                        >
                            <Columns.Column narrow>
                                <animated.div
                                    className="box"
                                    style={modalStyle}
                                >
                                    <Box
                                        className={classes?.['transparent-box']}
                                    >
                                        <Columns breakpoint="mobile" centered>
                                            <Columns.Column narrow>
                                                {/* https://www.davidhu.io/react-spinners/ */}
                                                <SpinnerComponent
                                                    type={spinner}
                                                />

                                                <Columns
                                                    breakpoint="mobile"
                                                    centered
                                                >
                                                    <Columns.Column narrow>
                                                        <Block
                                                            style={{
                                                                color: 'white',
                                                            }}
                                                        >
                                                            Logging in{' '}
                                                            {randomEmoji()?.toString()}
                                                        </Block>
                                                    </Columns.Column>
                                                </Columns>
                                            </Columns.Column>
                                        </Columns>
                                    </Box>
                                </animated.div>
                            </Columns.Column>
                        </Columns>
                    </Modal.Content>
                </Modal>
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
    'no-overflow': {
        overflow: 'hidden',
    },
});
