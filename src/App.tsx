import "./App.css";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Main from "./pages";
import Login from "./pages/login";
import Party from "./pages/party";

export default function App() {

	return (
		<BrowserRouter>
			<Routes>
				<Route element={<Main />} path="/" />
				<Route element={<Login />} path="/login" />
				<Route element={<Party />} path="/party" />
			</Routes>
		</BrowserRouter>
	);
}