import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// import "normalize.css";
// import 'normalize.css/normalize.css';

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
