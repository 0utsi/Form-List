import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { InternList } from "./components/InternList";
import { EditIntern } from "./components/EditIntern";
import { AddIntern } from "./components/AddIntern";

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
