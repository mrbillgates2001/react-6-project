import React, { useState } from "react";
import "./ContactApp.scss";

const ContactApp = () => {
	const [contacts, setContacts] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");

	const addContact = (newContact) => {
		setContacts([...contacts, newContact]);
	};

	const deleteContact = (contactIndex) => {
		const updatedContacts = contacts.filter(
			(_, index) => index !== contactIndex
		);
		setContacts(updatedContacts);
	};

	const editContact = (contactIndex, updatedContact) => {
		const updatedContacts = [...contacts];
		updatedContacts[contactIndex] = updatedContact;
		setContacts(updatedContacts);
	};

	const filteredContacts = contacts.filter((contact) =>
		contact.name.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<div className="container">
			<input
				type="search"
				placeholder="🔍 Search ... "
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
				className="search-bar"
			/>
			<AddContactForm addContact={addContact} />
			<ul>
				{filteredContacts.map((contact, index) => (
					<li key={index}>
						<table>
							<tr className="table-heading">
								<th>Firstname</th>
								<th>Lastname</th>
								<th>Phone</th>
							</tr>
							<tr className="table-content">
								<td>
									<h4>{contact.name} </h4>
								</td>
								<td>
									<h4>{contact.email} </h4>
								</td>
								<td>
									<h4>{contact.phone} </h4>
								</td>
							</tr>
						</table>
						<div className="buttons">
							<button onClick={() => deleteContact(index)}>Delete</button>
							<button onClick={() => editContact(index, updatedContactObject)}>
								Edit
							</button>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
};

const AddContactForm = ({ addContact }) => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		addContact({ name, email, phone });
		setName("");
		setEmail("");
		setPhone("");
	};

	return (
		<form className="fullname" onSubmit={handleSubmit}>
			<input
				type="text"
				placeholder="Firstname"
				value={name}
				onChange={(e) => setName(e.target.value)}
			/>
			<input
				type="text"
				placeholder="Lastname"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
			/>
			<input
				type="text"
				placeholder="+998 ..."
				value={phone}
				onChange={(e) => setPhone(e.target.value)}
			/>
			<button type="submit">Add Contact</button>
		</form>
	);
};

export default ContactApp;
