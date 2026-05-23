import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import "./i18n";
import { Router } from "./router";

if ("serviceWorker" in navigator) {
	window.addEventListener("load", () => {
		navigator.serviceWorker.register(`${import.meta.env.BASE_URL}sw.js`);
	});
}

const root = document.getElementById("root");

if (!root) {
	throw new Error("Root element not found");
}

createRoot(root).render(
	<StrictMode>
		<Router />
	</StrictMode>,
);
