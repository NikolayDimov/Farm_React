import { Routes, Route, Navigate } from "react-router-dom";
import AuthGuard from "./guards/AuthGuard";
import { AuthProvider } from "./context/AuthContext/AuthContext";
import Login from "./components/pages/Auth/Login/Login";
import Register from "./components/pages/Auth/Register/Register";
import WithNavbar from "./components/common/Navbar/ToggleWithNavbar";
import WithoutNavbar from "./components/common/Navbar/ToggleWithoutNavbar";
import { routes } from "./static/routes";
import { BackgroundImage, GlobalStyles } from "./components/BaseLayout/BaseLayout.style";
import BaseLayout from "./components/BaseLayout/BaseLayout";

function App() {
    return (
        <AuthProvider>
            <GlobalStyles />
            <BackgroundImage />

            <Routes>
                <Route element={<WithoutNavbar />}>
                    <Route index element={<Navigate to={routes.login} />} />
                    <Route path={routes.login} element={<Login />} />
                    <Route path={routes.register} element={<Register />} />
                </Route>
                <Route element={<AuthGuard />}>
                    <Route element={<WithNavbar />}>
                        <Route path="/*" element={<BaseLayout />} />
                    </Route>
                </Route>
            </Routes>
        </AuthProvider>
    );
}

export default App;
