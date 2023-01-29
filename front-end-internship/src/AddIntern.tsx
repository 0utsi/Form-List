import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

interface emailData {
	value: string;
	isValid: boolean;
}

export const AddIntern: React.FC<any> = () => {
	const [name, setName] = useState<string>();
	const [email, setEmail] = useState<emailData>();
	const [startDate, setStartDate] = useState<string>();
	const [endDate, setEndDate] = useState<string>();

	const addIntern = () => {
		const internData = {
			id: Date.now(),
			name: name,
			email: email?.value,
			internshipStart: startDate,
			internshipEnd: endDate,
		};
		axios
			.post("http://localhost:3001/interns", internData)
			.then((res: any) => console.log(res))
			.catch((err: any) => console.log(err));
	};
	const checkEmail = (email: string) => {
		if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
			return true;
		} else {
			return false;
		}
	};

	return (
		<div>
			<NavLink className="nav" to="/">
				<FontAwesomeIcon className="arrowIcon" icon={faArrowLeft} />
				Back to list
			</NavLink>
			<form className="container" onSubmit={addIntern}>
				<h2>Add Intern</h2>
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
					{email?.value && !email?.isValid && (
						<span className="error">Email you typed is not correct!</span>
					)}
					{!email?.value && (
						<span className="error">This field is required!</span>
					)}
				</div>
				<div className="dates">
					<div className="start">
						<label>Work start *</label>
						<input
							required
							className="data"
							type="date"
							value={startDate}
							onChange={(e) => {
								setStartDate(e.target.value);
							}}
						/>
						{!startDate && (
							<span className="error">This field is required!</span>
						)}
					</div>
					<div className="end">
						<label>Work end *</label>
						<input
							required
							className="data"
							type="date"
							value={endDate}
							onChange={(e) => {
								setEndDate(e.target.value);
							}}
						/>
						{!endDate && <span className="error">This field is required!</span>}
					</div>
				</div>
				<input
					className="editButton"
					type="submit"
					value="Submit"
					onChange={(e) => e.preventDefault()}
				/>
			</form>
		</div>
	);
};
