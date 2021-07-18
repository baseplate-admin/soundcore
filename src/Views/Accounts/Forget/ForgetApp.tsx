import { useFormik } from 'formik';
import * as yup from 'yup';
import { IoMailOutline } from 'react-icons/io5';
import { createUseStyles } from 'react-jss';
import { formWithInputBoxVariables } from '../../../Components/App/FormWithInputBox/variables';

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

    const classes = useStyles();

    return (
        <form onSubmit={handleSubmit}>
            <div className={`field is-horizontal ${classes.items}`}>
                <div className="field-body">
                    <div className="field">
                        <div className="control is-expanded has-icons-left">
                            <input
                                className={`input ${classes.input}`}
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
                        className={`button is-rounded is-centered ${classes.button}`}
                    >
                        Reset Password
                    </button>
                </div>
            </div>
        </form>
    );
};

const useStyles = createUseStyles({
    items: {
        padding: '0.4em',
    },

    input: {
        backgroundColor: formWithInputBoxVariables.inputFieldColor,
        border: `1px solid ${formWithInputBoxVariables.inputBorderColor} !important`,
        color: formWithInputBoxVariables.mainFontColor,

        '&::placeholder': {
            color: formWithInputBoxVariables.mainFontColor,
            opacity: 0.3,
            fontFamily: formWithInputBoxVariables.buttonFont,
        },
    },

    button: {
        backgroundColor: `${formWithInputBoxVariables.buttonBackgroundColor} !important`,
        border: `1px solid ${formWithInputBoxVariables.inputBorderColor} !important`,
        color: `${formWithInputBoxVariables.mainFontColor} !important`,
        transition: '0.4s',
        fontFamily: `${formWithInputBoxVariables.buttonFont} !important`,

        '&:hover': {
            backgroundColor: `${formWithInputBoxVariables.buttonHoverBackgroundColor} !important`,
            color: formWithInputBoxVariables.buttonHoverFontColor,
            fontFamily: formWithInputBoxVariables.buttonFont,
        },
    },
});
