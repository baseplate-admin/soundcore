// Bulma Import
import 'bulma/bulma.sass';

//Font Import
import { nunitoFontStyle } from '../Functions/Fonts/Nunito';
import { robotoFontStyle } from '../Functions/Fonts/Roboto';

// GLobal Scss import
import './index.scss';

// React import
import { Fragment, lazy, Suspense } from 'react';
import { Route, Switch, HashRouter } from 'react-router-dom';

// Routing Enum Function
import { RoutingPath } from '../Routes';

// Loaders
import { HomePageLoaderApp } from '../Components/Loaders/HomePageLoader/HomePageLoader';
import { FormWithInputBoxLoader } from '../Components/Loaders/FormWithInputBox/FormWithInputBoxLoader';
import { ForgetPage } from './Accounts/Forget/ForgetApp';

export const App = () => {
    // Init Font
    nunitoFontStyle();
    robotoFontStyle();

    //  Lazy Import for Pages

    const HomePage = lazy(() =>
        import('./Home/Root/HomeApp').then(({ HomePage }) => ({
            default: HomePage,
        }))
    );

    const LoginPage = lazy(() =>
        import('./Accounts/Login/LoginApp').then(({ LoginPage }) => ({
            default: LoginPage,
        }))
    );

    const RegisterPage = lazy(() =>
        import('./Accounts/Register/RegisterApp').then(({ RegisterPage }) => ({
            default: RegisterPage,
        }))
    );
    const FormWithInputBoxComponent = lazy(() =>
        import('../Components/App/FormWithInputBox/FormWithInputBox').then(
            ({ FormWithInputBoxComponent }) => ({
                default: FormWithInputBoxComponent,
            })
        )
    );

    const UploadSongPage = lazy(() =>
        import('./Upload/Song/UploadSongApp').then(({ UploadSongPage }) => ({
            default: UploadSongPage,
        }))
    );

    return (
        <Fragment>
            <HashRouter>
                <Switch>
                    <Route path={RoutingPath.HOME_PAGE} exact>
                        <Suspense fallback={HomePageLoaderApp}>
                            <HomePage />
                        </Suspense>
                    </Route>
                    <Route path={RoutingPath.LOGIN_PAGE} exact>
                        <Suspense fallback={FormWithInputBoxLoader}>
                            <FormWithInputBoxComponent children={LoginPage} />
                        </Suspense>
                    </Route>
                    <Route path={RoutingPath.REGISTER_PAGE} exact>
                        <Suspense fallback={FormWithInputBoxLoader}>
                            <FormWithInputBoxComponent
                                children={RegisterPage}
                            />
                        </Suspense>
                    </Route>
                    <Route path={RoutingPath.FORGET_PASSWORD_PAGE} exact>
                        <Suspense fallback={FormWithInputBoxLoader}>
                            <FormWithInputBoxComponent children={ForgetPage} />
                        </Suspense>
                    </Route>
                    <Route path={RoutingPath.UPLOAD_SONG_PAGE}>
                        <Suspense fallback={FormWithInputBoxLoader}>
                            <FormWithInputBoxComponent
                                children={UploadSongPage}
                            />
                        </Suspense>
                    </Route>
                </Switch>
            </HashRouter>
        </Fragment>
    );
};
