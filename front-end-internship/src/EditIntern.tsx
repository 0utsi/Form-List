import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";

interface InternProps {
	id: number;
	name: string;
	email: string;
	internshipStart: string;
	internshipEnd: string;
}

export const EditIntern: React.FC = () => {
	const { id } = useParams();

	const [intern, setIntern] = useState<InternProps>();

	const [name, setName] = useState();
	const [email, setEmail] = useState();

	useEffect(() => {
		const fetchIntern = async () => {
			const response = await fetch(`http://localhost:3001/interns/${id}`);
			const intern = await response.json();
			setIntern(intern);
			console.log(intern.name);
		};
		fetchIntern();
	}, [id]);

	if (!intern) return <span className="loading">Loading...</span>;
	return (
		<div>
			<NavLink className="nav" to="/">
				Back to list
			</NavLink>
			<form className="container">
				<h2>Edit Intern</h2>
				<label>Full Name *</label>
				<input
					required
					type="text"
					name="name"
					defaultValue={intern.name}
					value={undefined}
				/>
				<label>Email address *</label>
				<input
					required
					type="text"
					name="email"
					defaultValue={intern.email}
					value={undefined}
					onChange={}
				/>
				<div className="dates">
					<div className="start">
						<label>Work start *</label>
						<input required className="data" type="date" />
					</div>
					<div className="end">
						<label>Work end *</label>
						<input required className="data" type="date" />
					</div>
				</div>
				<input className="editButton" type="submit" value="Submit" />
			</form>
		</div>
	);
};
