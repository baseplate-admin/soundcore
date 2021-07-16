// Bulma Import
import 'bulma/bulma.sass';

// GLobal Scss import
import './index.scss';

// Font Import
import '../Extras/Font.scss';

// React import
import { Fragment, lazy, Suspense } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    HashRouter,
} from 'react-router-dom';

// Routing Enum Function
import { RoutingPath } from './routing';
// Loaders
import { HomePageLoaderApp } from '../Components/Loaders/HomePageLoader/HomePageLoader';
import { FormWithInputBoxLoader } from '../Components/Loaders/FormWithInputBox/FormWithInputBoxLoader';

export const App = () => {
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

    const UploadSongApp = lazy(() =>
        import('./Upload/Song/UploadSongApp').then(({ UploadSongApp }) => ({
            default: UploadSongApp,
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
                    <Route path={RoutingPath.UPLOAD_SONG_PAGE}>
                        <Suspense fallback={FormWithInputBoxLoader}>
                            <UploadSongApp />
                        </Suspense>
                    </Route>
                </Switch>
            </HashRouter>
        </Fragment>
    );
};
