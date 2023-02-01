import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { List } from "./components/List";
import { EditList } from "./components/EditList";
import { AddToList } from "./components/AddToList";

function App() {
	return (
		<BrowserRouter>
			<div className="App">
				<Routes>
					<Route path="/" element={<List />} />
					<Route path="/interns/:id" element={<EditList />} />
					<Route path="/addintern" element={<AddToList />} />
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
