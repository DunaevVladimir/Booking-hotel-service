import React from 'react';
import './styles/global.scss';
import Home from './components/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Registration from './components/Registration';
import Login from './components/Login';
import UserCard from './components/UserCard';
import RegistrationSuccessful from './components/RegistrationSuccessful';
import Card from './components/Card';
import ChangeInfo from './components/ChangeInfo';

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/registration' element={<Registration />} />
				<Route path='/login' element={<Login />} />
				<Route path='/usercard' element={<UserCard />} />
				<Route path='/registrationSuccessful' element={<RegistrationSuccessful />} />
				<Route path='/list/:id' element={<Card />} />
				<Route path='/usercard/changeinfo' element={<ChangeInfo />} />
			</Routes>
		</BrowserRouter>
	);
}