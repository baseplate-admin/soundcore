import { Container } from 'react-bulma-components';
import { createUseStyles } from 'react-jss';
import { LoaderColors } from '../../../Config/Colors/Loaders';

export const HashLoader = () => {
    const classes = useStyles();

    return (
        <Container>
            <span className={classes?.wrapper}>
                <span className={classes?.style1} />
                <span className={classes?.style2} />
            </span>
        </Container>
    );
};

const useStyles = createUseStyles({
    '@keyframes animation-1': {
        '0%': {
            width: '10px',
            boxShadow: `${LoaderColors?.HASH_LOADER} 20px -10px, ${LoaderColors?.HASH_LOADER} -20px 10px`,
        },
        '35%': {
            width: '50px',
            boxShadow: `${LoaderColors?.HASH_LOADER} 0px -10px, ${LoaderColors?.HASH_LOADER} 0px 10px`,
        },
        '70%': {
            width: '10px',
            boxShadow: `${LoaderColors?.HASH_LOADER} -20px -10px, ${LoaderColors?.HASH_LOADER} 20px 10px`,
        },
        '100%': {
            boxShadow: `${LoaderColors?.HASH_LOADER} 20px -10px, ${LoaderColors?.HASH_LOADER} -20px 10px`,
        },
    },
    '@keyframes animation-2': {
        '0%': {
            height: '10px',
            boxShadow: `${LoaderColors?.HASH_LOADER} 10px 20px, ${LoaderColors?.HASH_LOADER} -10px -20px`,
        },
        '35%': {
            height: '50px',
            boxShadow: `${LoaderColors?.HASH_LOADER} 10px 0px, ${LoaderColors?.HASH_LOADER} -10px 0px`,
        },
        '70%': {
            height: '10px',
            boxShadow: `${LoaderColors?.HASH_LOADER} 10px -20px, ${LoaderColors?.HASH_LOADER} -10px 20px`,
        },
        '100%': {
            boxShadow: `${LoaderColors?.HASH_LOADER} 10px 20px, ${LoaderColors?.HASH_LOADER} -10px -20px`,
        },
    },
    style1: {
        position: 'absolute',
        content: "''",
        top: '50%',
        left: '50%',
        display: 'block',
        width: '10px',
        height: '10px',
        borderRadius: '5px',
        transform: 'translate(-50%, -50%)',
        animation: '2s ease 0s infinite normal none running $animation-1',
    },
    style2: {
        position: 'absolute',
        content: "''",
        top: '50%',
        left: '50%',
        display: 'block',
        width: '10px',
        height: '10px',
        borderRadius: '5px',
        transform: 'translate(-50%, -50%)',
        animation: '2s ease 0s infinite normal none running $animation-2',
    },
    wrapper: {
        position: 'relative',
        width: 50,
        height: 50,
        transform: 'rotate(165deg)',
        display: 'inline-block',
    },
});
