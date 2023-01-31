import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import { start } from "repl";

interface InternResponse {
	id: number;
	name: string;
	email: string;
	internshipStart: string;
	internshipEnd: string;
}

interface emailData {
	value: string;
	isValid: boolean;
}

export const EditIntern: React.FC = () => {
	const { id } = useParams();

	const [intern, setIntern] = useState<InternResponse>();

	const [name, setName] = useState<string>();
	const [email, setEmail] = useState<emailData>();
	const [startDate, setStartDate] = useState<string>();
	const [endDate, setEndDate] = useState<string>();

	const [validate, setValidate] = useState<boolean>();

	useEffect(() => {
		axios.get(`http://localhost:3001/interns/${id}`).then((response) => {
			const intern = response.data;
			setIntern(intern);
			setName(intern.name);
			setEmail({
				value: intern.email,
				isValid: true,
			});
			setStartDate(intern.internshipStart.slice(0, 10));
			setEndDate(intern.internshipEnd.slice(0, 10));
		});
	}, [id]);

	useEffect(() => {}, [name, email, startDate, endDate]);

	const editIntern = () => {
		const internData = {
			id: id,
			name: name,
			email: email?.value,
			internshipStart: startDate,
			internshipEnd: endDate,
		};
		axios
			.put(`http://localhost:3001/interns/${id}`, internData)
			.then((res: any) => console.log(res));
	};

	const checkEmail = (email: string) => {
		if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
			return true;
		}
		return false;
	};

	useEffect(() => {
		if (typeof [startDate, endDate]! != "undefined" && endDate && startDate) {
			if (startDate > endDate) setValidate(true);
			if (endDate > startDate) setValidate(true);
		}
	}, [startDate, endDate]);

	if (!intern) return <span className="loadingScreen">Loading...</span>;
	return (
		<div>
			<NavLink className="nav" to="/">
				<FontAwesomeIcon className="arrowIcon" icon={faArrowLeft} />
				Back to list
			</NavLink>
			<form className="container" onSubmit={editIntern}>
				<h2>Edit Intern</h2>
				<div className="nameInput">
					<label>Full Name *</label>
					<input
						required
						type="text"
						name="name"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
					{!name && <span className="error">This field is required!</span>}
				</div>
				<div className="mailInput">
					<label>Email address *</label>
					<input
						required
						type="text"
						name="email"
						value={email?.value}
						onChange={(e) =>
							setEmail({
								value: e.target.value,
								isValid: checkEmail(e.target.value),
							})
						}
					/>
					{!email?.isValid && (
						<span className="error">Email you typed is not correct!</span>
					)}
				</div>
				<div className="dates">
					<div className="start">
						<label>Work start *</label>
						<input
							required
							className="data"
							type="date"
							defaultValue={startDate}
							value={startDate}
							onChange={(e) => {
								setStartDate(e.target.value);
							}}
						/>
					</div>
					<div className="end">
						<label>Work end *</label>
						<input
							required
							className="data"
							type="date"
							defaultValue={endDate}
							value={endDate}
							onChange={(e) => {
								setEndDate(e.target.value);
							}}
						/>
						{!validate && (
							<span className="error">This date is not correct!</span>
						)}
					</div>
				</div>
				<input className="editButton" type="submit" value="Submit" />
			</form>
		</div>
	);
};
