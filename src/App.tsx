import "./App.css";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Main from "./pages";
import Login from "./pages/login";
import PartyIndex from "./pages/party";
import Check from "./pages/login/check";
import FilmsIndex from "./pages/films";
import PartyApp from "./pages/party/app";
import LayoutContainer from "./containers/layout";
import KeyboardIndex from "./pages/keyboard";

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					element={
						<LayoutContainer>
							<Main />
						</LayoutContainer>
					}
					path="/"
				/>

				<Route
					element={
						<LayoutContainer>
							<Login />
						</LayoutContainer>
					}
					path="/login"
				/>
				<Route
					element={
						<LayoutContainer>
							<Check />
						</LayoutContainer>
					}
					path="/login/check"
				/>

				<Route
					element={
						<LayoutContainer>
							<PartyIndex />
						</LayoutContainer>
					}
					path="/party"
				/>
				<Route
					element={
						<LayoutContainer>
							<PartyApp />
						</LayoutContainer>
					}
					path="/party/app"
				/>

				<Route
					element={
						<LayoutContainer>
							<FilmsIndex />
						</LayoutContainer>
					}
					path="/films"
				/>

				<Route
					element={
						<LayoutContainer>
							<KeyboardIndex />
						</LayoutContainer>
					}
					path="/keyboard"
				/>
			</Routes>
		</BrowserRouter>
	);
}
