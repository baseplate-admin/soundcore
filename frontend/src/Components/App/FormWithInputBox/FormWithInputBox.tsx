// Type Import
import { FC, Fragment } from 'react';

// Logo Import
import loginLogo from '../../../Assets/Images/brand_logo.png';
import { createUseStyles } from 'react-jss';
import { formWithInputBoxVariables } from './variables';
import { Columns, Container, Hero, Box, Image } from 'react-bulma-components';

interface FormWithInputBoxComponentPropsInterface {
    children: FC;
}

export const FormWithInputBoxComponent = (
    props: FormWithInputBoxComponentPropsInterface
) => {
    const classes = useStyles();

    return (
        <Fragment>
            <Hero size="fullheight" className={classes?.['login-hero']}>
                <Hero.Body>
                    <Container>
                        <Columns
                            centered
                            // breakpoint="half-desktop full-mobile narrow-tablet"
                        >
                            <Columns.Column className="is-half-desktop is-full-mobile is-narrow-tablet">
                                <Box className={classes?.['icon-box']}>
                                    <Columns breakpoint="mobile " centered>
                                        <Columns.Column narrow>
                                            <Image
                                                src={loginLogo ?? ''}
                                                alt={
                                                    loginLogo ??
                                                    'no_banner_picture'
                                                }
                                                className={`
                                                    ${classes?.['no-select']}
                                                    ${classes?.['brand-logo']}
                                                `}
                                            />
                                        </Columns.Column>
                                    </Columns>
                                </Box>
                                <Box className={classes?.['login-box']}>
                                    {<props.children />}
                                </Box>
                            </Columns.Column>
                        </Columns>
                    </Container>
                </Hero.Body>
            </Hero>
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
    'brand-logo': {
        width: '150px !important',
        height: '40px  !important',
    },
});
