import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AuthGuard from './guards/AuthGuard';


import { AuthProvider } from './context/AuthContext';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import About from './components/Home/Homepage/About';
import Contact from './components/Home/Homepage/Contact';
import ProfilePage from './components/Profile/Profile';
import Service from './components/Service/ServicePage';


function App() {

	return (
		<AuthProvider>
			<Navbar />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/home' element={<Home />} />
				<Route path='/login' element={<Login />} />
				<Route path='/register' element={<Register />} />
				<Route path='/about' element={<About />} />
				<Route path='/contact' element={<Contact />} />

				<Route element={<AuthGuard />}>
					<Route path='/profile' element={<ProfilePage />} />
					<Route path='/service' element={<Service />} />
				</Route>

			</Routes>
		</AuthProvider>
		
	);
}

export default App;
