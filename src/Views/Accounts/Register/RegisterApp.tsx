import { Fragment } from 'react';
import { Helmet } from 'react-helmet';

// Formik Import
import { useFormik } from 'formik';

// Icons import
import { IoMailOutline, IoPersonCircleOutline } from 'react-icons/io5';
import { MdLockOpen, MdLockOutline } from 'react-icons/md';

// SVG React Component
import { CharacterAIcon } from './Icons/CharacterA';
import { CharacterZIcon } from './Icons/CharacterZ';

// Yup for form validation
import * as yup from 'yup';

// TippyJS import for Form Error Showing
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional
import 'tippy.js/dist/backdrop.css';
import 'tippy.js/animations/shift-away.css';
import { ApplicationName } from '../../../Routes';
import { createUseStyles } from 'react-jss';
import { formWithInputBoxVariables } from '../../../Components/App/FormWithInputBox/variables';

export const RegisterPage = () => {
    const classes = useStyles();
    const registerSchema = yup.object().shape({
        firstName: yup
            .string()
            .required('Please Enter First Name')
            .max(20, 'First name must be less than 20 Characters'),
        lastName: yup
            .string()
            .required('Please Enter Last Name')
            .max(20, 'Last name must be less than 20 Characters'),
        userName: yup
            .string()
            .required('Please Enter User Name')
            .min(0)
            .max(50, 'User name must be less than 50 Characters'),
        email: yup
            .string()
            .email('Enter a valid Email')
            .required('Please Enter Email'),
        password: yup
            .string()
            .min(8, 'Password must be more than 8 Characters')
            .matches(
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character'
            )
            .max(1024, 'Password must be less than 1024 Characters'),
        confirmPassword: yup
            .string()
            .oneOf([yup.ref('password'), null], 'Passwords are not the same'),
    });

    const { handleSubmit, errors, handleChange } = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            userName: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: registerSchema,
        onSubmit(values) {},
    });
    return (
        <Fragment>
            <Helmet>
                <title> {ApplicationName} | Register </title>
            </Helmet>
            <form onSubmit={handleSubmit}>
                <div className={`field is-horizontal ${classes.items}`}>
                    <div className="field-body">
                        <div className="field">
                            <Tippy
                                offset={[0, 9]}
                                theme="attention"
                                placement="top"
                                content={errors.firstName}
                                visible={errors.firstName ? true : false}
                            >
                                <p className="control is-expanded has-icons-left">
                                    <input
                                        type="text"
                                        className={`input ${classes.input}`}
                                        name="firstName"
                                        placeholder="First Name"
                                        onInput={handleChange}
                                    />
                                    <span
                                        className={`is-small is-left icon ${classes.icon}`}
                                    >
                                        <CharacterAIcon
                                            style={{
                                                transform: 'scale(.8)',
                                                color: 'white',
                                            }}
                                        />
                                    </span>
                                </p>
                            </Tippy>
                        </div>
                    </div>
                </div>
                <div className={`field is-horizontal ${classes.items}`}>
                    <div className="field-body">
                        <div className="field">
                            <Tippy
                                offset={[0, 9]}
                                theme="attention"
                                placement="top"
                                content={errors.lastName}
                                visible={errors.lastName ? true : false}
                            >
                                <p className="control is-expanded has-icons-left">
                                    <input
                                        type="text"
                                        className={`input ${classes.input}`}
                                        name="lastName"
                                        placeholder="Last Name"
                                        onInput={handleChange}
                                    />{' '}
                                    <span
                                        className={`is-small is-left icon ${classes.icon}`}
                                    >
                                        <CharacterZIcon
                                            style={{
                                                transform: 'scale(.8)',
                                                color: 'white',
                                            }}
                                        />
                                    </span>
                                </p>
                            </Tippy>
                        </div>
                    </div>
                </div>
                <div className={`field is-horizontal ${classes.items}`}>
                    <div className="field-body">
                        <div className="field">
                            <Tippy
                                offset={[0, 9]}
                                theme="attention"
                                placement="top"
                                content={errors.userName}
                                visible={errors.userName ? true : false}
                            >
                                <p className="control is-expanded has-icons-left">
                                    <input
                                        type="text"
                                        className={`input ${classes.input}`}
                                        name="userName"
                                        placeholder="Username"
                                        onInput={handleChange}
                                    />
                                    <span
                                        className={`icon is-small is-left ${classes.icon}`}
                                    >
                                        <IoPersonCircleOutline
                                            color="white"
                                            style={{
                                                transform: 'scale(1.6)',
                                            }}
                                        />
                                    </span>
                                </p>
                            </Tippy>
                        </div>
                    </div>
                </div>

                <div className={`field is-horizontal ${classes.items}`}>
                    <div className="field-body">
                        <div className="field">
                            <Tippy
                                offset={[0, 9]}
                                theme="attention"
                                placement="top"
                                content={errors.email}
                                visible={errors.email ? true : false}
                            >
                                <p className="control is-expanded has-icons-left">
                                    <input
                                        type="email"
                                        className={`input ${classes.input}`}
                                        name="email"
                                        placeholder="Email"
                                        onInput={handleChange}
                                    />
                                    <span
                                        className={`icon is-small is-left ${classes.icon}`}
                                    >
                                        <IoMailOutline
                                            color="white"
                                            style={{
                                                transform: 'scale(1.4)',
                                            }}
                                        />
                                    </span>
                                </p>
                            </Tippy>
                        </div>
                    </div>
                </div>

                <div className={`field is-horizontal ${classes.items}`}>
                    <div className="field-body">
                        <div className="field">
                            <Tippy
                                offset={[0, 9]}
                                theme="attention"
                                placement="top"
                                content={errors.password}
                                visible={errors.password ? true : false}
                            >
                                <p className="control is-expanded has-icons-left ">
                                    <input
                                        type="password"
                                        className={`input ${classes.input}`}
                                        name="password"
                                        placeholder="Password"
                                        onInput={handleChange}
                                    />
                                    <span
                                        className={`icon is-small is-left ${classes.icon}`}
                                    >
                                        <MdLockOpen
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
                <div className={`field is-horizontal ${classes.items}`}>
                    <div className="field-body">
                        <div className="field">
                            <Tippy
                                offset={[0, 9]}
                                theme="attention"
                                placement="top"
                                content={errors.confirmPassword}
                                visible={errors.confirmPassword ? true : false}
                            >
                                <p className="control is-expanded has-icons-left">
                                    <input
                                        type="password"
                                        className={`input ${classes.input}`}
                                        name="confirmPassword"
                                        placeholder="Confirm Password"
                                        onInput={handleChange}
                                    />
                                    <span
                                        className={`icon is-small is-left ${classes.icon}`}
                                    >
                                        <MdLockOutline
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

                <div
                    className={`columns is-mobile is-centered ${classes.items}`}
                >
                    <div className="column is-narrow">
                        <button
                            className={`button is-rounded is-centered ${classes.button}`}
                        >
                            Register
                        </button>
                    </div>
                </div>
            </form>
        </Fragment>
    );
};
const useStyles = createUseStyles({
    icon: {
        pointerEvents: 'initial !important',
    },

    input: {
        backgroundColor: `${formWithInputBoxVariables.inputFieldColor} !important`,
        border: `1px solid ${formWithInputBoxVariables.inputBorderColor} !important`,
        color: `${formWithInputBoxVariables.mainFontColor} !important`,

        '&::placeholder': {
            color: formWithInputBoxVariables.mainFontColor,
            opacity: 0.5,
            fontFamily: formWithInputBoxVariables.inputPlaceholderFont,
        },
    },

    items: {
        paddingTop: '1em',
    },

    button: {
        backgroundColor: `${formWithInputBoxVariables.buttonBackgroundColor} !important`,
        border: `1px solid ${formWithInputBoxVariables.inputBorderColor} !important`,
        color: formWithInputBoxVariables.mainFontColor,
        transition: '0.4s',
        fontFamily: formWithInputBoxVariables.buttonFont,

        '&:hover': {
            backgroundColor: `${formWithInputBoxVariables.buttonHoverBackgroundColor} !important`,
            color: `${formWithInputBoxVariables.buttonHoverFontColor} !important`,
            fontFamily: formWithInputBoxVariables.buttonFont,
        },
    },
});
