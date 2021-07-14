import { Fragment } from 'react';
import { Helmet } from 'react-helmet';
// Formik Import
import { useFormik } from 'formik';

// Scss Import
import './scss/RegisterApp.scoped.scss';

// Icons import
import { IoMailOutline, IoPersonCircleOutline } from 'react-icons/io5';
import { MdLockOpen, MdLockOutline } from 'react-icons/md';

// SVG React Component
import { CharacterAIcon } from './icons/CharacterA';
import { CharacterZIcon } from './icons/CharacterZ';

// Yup for form validation
import * as yup from 'yup';

// TippyJS import for Form Error Showing
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional
import 'tippy.js/dist/backdrop.css';
import 'tippy.js/animations/shift-away.css';
import { ApplicationName } from '../../routing';

export const RegisterPage = () => {
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
                <div className="items field is-horizontal">
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
                                        className="input"
                                        name="firstName"
                                        placeholder="First Name"
                                        onInput={handleChange}
                                    />
                                    <span className="icon is-small is-left">
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
                <div className="items field is-horizontal">
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
                                        className="input"
                                        name="lastName"
                                        placeholder="Last Name"
                                        onInput={handleChange}
                                    />{' '}
                                    <span className="icon is-small is-left">
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
                <div className="items field is-horizontal">
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
                                        className="input"
                                        name="userName"
                                        placeholder="Username"
                                        onInput={handleChange}
                                    />
                                    <span className="icon is-small is-left">
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

                <div className="items field is-horizontal">
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
                                        className="input"
                                        name="email"
                                        placeholder="Email"
                                        onInput={handleChange}
                                    />
                                    <span className="icon is-small is-left">
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

                <div className="items field is-horizontal">
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
                                        className="input"
                                        name="password"
                                        placeholder="Password"
                                        onInput={handleChange}
                                    />
                                    <span className="icon is-small is-left">
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
                <div className="items field is-horizontal">
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
                                        className="input"
                                        name="confirmPassword"
                                        placeholder="Confirm Password"
                                        onInput={handleChange}
                                    />
                                    <span className="icon is-small is-left">
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

                <div className="items columns is-mobile is-centered">
                    <div className="column is-narrow">
                        <button
                            id="button"
                            className="button is-rounded is-centered"
                        >
                            Register
                        </button>
                    </div>
                </div>
            </form>
        </Fragment>
    );
};
