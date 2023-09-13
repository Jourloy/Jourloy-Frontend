import "./App.css";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Main from "./pages";
import Login from "./pages/login";
import PartyIndex from "./pages/party";
import Check from "./pages/login/check";
import PartyApp from "./pages/party/app";
import LayoutContainer from "./containers/layout";
import KeyboardIndex from "./pages/keyboard";
import TrackerIndex from "./pages/tracker";
import TrackerApp from "./pages/tracker/app";
import TrackerCreate from "./pages/tracker/create";
import Blocked from "./pages/blocked";

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
						<LayoutContainer ignoreDomainCheck>
							<Login />
						</LayoutContainer>
					}
					path="/login"
				/>
				<Route
					element={
						<LayoutContainer ignoreDomainCheck>
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
							<KeyboardIndex />
						</LayoutContainer>
					}
					path="/keyboard"
				/>

				<Route
					element={
						<LayoutContainer>
							<TrackerIndex />
						</LayoutContainer>
					}
					path="/tracker"
				/>

				<Route
					element={
						<LayoutContainer>
							<TrackerCreate />
						</LayoutContainer>
					}
					path="/tracker/create"
				/>

				<Route
					element={
						<LayoutContainer>
							<TrackerApp />
						</LayoutContainer>
					}
					path="/tracker/app"
				/>

				<Route
					element={
						<LayoutContainer>
							<Blocked />
						</LayoutContainer>
					}
					path="/blocked"
				/>
			</Routes>
		</BrowserRouter>
	);
}
