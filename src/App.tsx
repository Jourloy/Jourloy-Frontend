import "./App.css";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Main from "./pages";
import Login from "./pages/login";
import PartyIndex from "./pages/party";
import Check from "./pages/login/check";
import FilmsIndex from "./pages/films";
import PartyApp from "./pages/party/app";

export default function App() {

	return (
		<BrowserRouter>
			<Routes>
				<Route element={<Main />} path="/" />

				<Route element={<Login />} path="/login" />
				<Route element={<Check />} path="/login/check" />

				<Route element={<PartyIndex />} path="/party" />
				<Route element={<PartyApp />} path="/party/app" />
				
				<Route element={<FilmsIndex />} path="/films" />
			</Routes>
		</BrowserRouter>
	);
}