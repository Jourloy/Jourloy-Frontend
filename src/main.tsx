import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import DefaultContainer from "./containers/index.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<DefaultContainer>
			<App />
		</DefaultContainer>
	</React.StrictMode>
);
