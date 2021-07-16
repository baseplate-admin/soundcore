import './scss/forgetapp.scoped.scss';

import { useFormik } from 'formik';
import * as yup from 'yup';
import { IoMailOutline } from 'react-icons/io5';

export const ForgetPage = () => {
    const forgetPasswordEmailSchema = yup.object().shape({
        email: yup
            .string()
            .email('Enter a valid Email')
            .required('Please Enter Email'),
    });

    const { handleSubmit, handleChange, errors } = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: forgetPasswordEmailSchema,
        onSubmit(values) {},
    });

    return (
        <form onSubmit={handleSubmit}>
            <div className="items field is-horizontal">
                <div className="field-body">
                    <div className="field">
                        <div className="control is-expanded has-icons-left">
                            <input
                                className="input"
                                name="email"
                                onChange={handleChange}
                                placeholder="Enter your email"
                            />
                            <span className="is-left icon">
                                <IoMailOutline
                                    color="white"
                                    style={{ transform: 'scale(1.5)' }}
                                />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="items columns is-mobile is-centered">
                <div className="column is-narrow">
                    <button
                        id="button"
                        className="button is-rounded is-centered"
                    >
                        Reset Password
                    </button>
                </div>
            </div>
        </form>
    );
};
