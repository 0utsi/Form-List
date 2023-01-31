import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Intern {
	id: number;
	name: string;
	email: string;
}

export const InternList: React.FC = () => {
	const [interns, setInterns] = useState<Intern[]>([]);

	useEffect(() => {
		const fetchInterns = async () => {
			const response = await fetch("http://localhost:3001/interns");
			const interns: Intern[] = await response.json();
			setInterns(interns);
		};
		fetchInterns();
	}, []);

	return (
		<div className="internsPage">
			<div className="heading">
				<h2>Interns</h2>
				<NavLink className="addNav" to={`/addintern`}>
					<button className="addInternBtn">Add Intern</button>
				</NavLink>
			</div>
			<ul className="internsList">
				{interns.map((intern) => (
					<li className="intern" key={intern.id}>
						<span className="name">{intern.name}</span>
						<span className="email">({intern.email})</span>
						<NavLink className="editNav" to={`/interns/${intern.id}`}>
							<FontAwesomeIcon className="editIcon" icon={faPenToSquare} />
							<span>Edit</span>
						</NavLink>
					</li>
				))}
			</ul>
		</div>
	);
};
