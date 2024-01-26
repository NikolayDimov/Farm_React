import { Routes, Route } from 'react-router-dom';
import AuthGuard from './guards/AuthGuard';
import { AuthProvider } from './context/AuthContext';
import Login from './components/pages/Login/Login';
import Register from './components/pages/Register/Register';
import Home from './components/pages/Home/Home';
import ProfilePage from './components/pages/Profile/Profile';
import Service from './components/pages/Service/ServicePage';
import WithNavbar from './components/pages/Navbar/ToggleWithNavbar';
import WithoutNavbar from './components/pages/Navbar/ToggleWithoutNavbar';
import { routes } from './static/routes';


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
						<Route path={routes.profile} element={<ProfilePage />} />
						<Route path={routes.service} element={<Service />} />
					</Route>
				</Route>
			</Routes>
		</AuthProvider>	
	);
}

export default App;
