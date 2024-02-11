import { Routes, Route } from "react-router-dom";
import AuthGuard from "./guards/AuthGuard";
import { AuthProvider } from "./context/AuthContext";
import Login from "./components/pages/Auth/Login/Login";
import Register from "./components/pages/Auth/Register/Register";
import Home from "./components/pages/Home/Home";
import Report from "./components/pages/Reports/Report";
import Service from "./components/BaseLayout/BaseLayout";
import WithNavbar from "./components/pages/Navbar/ToggleWithNavbar";
import WithoutNavbar from "./components/pages/Navbar/ToggleWithoutNavbar";
import { routes } from "./static/routes";
import NotFound from "./components/pages/NotFound/NotFound";

function App() {
    return (
        <AuthProvider>
            {/* <Navbar /> */}
            <Routes>
                <Route element={<WithoutNavbar />}>
                    <Route path={routes.login} element={<Login />} />
                    <Route path={routes.register} element={<Register />} />
                </Route>
                <Route element={<AuthGuard />}>
                    <Route element={<WithNavbar />}>
                        <Route path={routes.home} element={<Home />} />
                        <Route path={routes.service} element={<Service />} />
                        <Route path={routes.report} element={<Report />} />
                        <Route path={routes.notFound} element={<NotFound />} />
                    </Route>
                </Route>
            </Routes>
        </AuthProvider>
    );
}

export default App;
