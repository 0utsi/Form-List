import React from "react";
import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { InternList } from "./InternList";
import { EditIntern } from "./EditIntern";
import { AddIntern } from "./AddIntern";

function App() {
	return (
		<BrowserRouter>
			<div className="App">
				<Routes>
					<Route path="/" element={<InternList />} />
					<Route path="/interns/:id" element={<EditIntern />} />
					<Route path="/addintern" element={<AddIntern />} />
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
