import App from "./App.tsx";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import DefaultContainer from "./containers/index.tsx";
import * as Sentry from "@sentry/react";
import React from "react";
import ReactDOM from "react-dom/client";
import {createRoutesFromChildren, matchRoutes, useLocation, useNavigationType} from "react-router-dom";

Sentry.init({
	dsn: import.meta.env.VITE_SENTRY_DSN,
	integrations: [
		new Sentry.BrowserTracing({
			// See docs for support of different versions of variation of react router
			// https://docs.sentry.io/platforms/javascript/guides/react/configuration/integrations/react-router/
			routingInstrumentation: Sentry.reactRouterV6Instrumentation(
				React.useEffect,
				useLocation,
				useNavigationType,
				createRoutesFromChildren,
				matchRoutes
			),
		}),
		new Sentry.Replay(),
	],

	tracesSampleRate: 1.0,

	// Capture Replay for 10% of all sessions,
	// plus for 100% of sessions with an error
	replaysSessionSampleRate: 1.0,
	replaysOnErrorSampleRate: 1.0,
});

const container = document.getElementById(`root`);
ReactDOM.createRoot(container!).render(
	<DefaultContainer>
		<App />
	</DefaultContainer>
);
