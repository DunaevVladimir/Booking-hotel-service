import React from 'react';
import styles from './UserCard.module.css';
import Button from '../Button';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function UserCard() {
	const [card, setCard] = useState([]);

	useEffect(() => {
		fetch("http://localhost:5000/usercard", {
			method: "POST",
			crossDomain: true,
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				"Access-Control-Allow-Origin": '*',
			},
			body: JSON.stringify({
				token: window.localStorage.getItem("token"),
			}),
		}).then((res) => res.json())
			.then((data) => {
				setCard(data.data);
			})
	}, []);

	return (
		<div className={styles.content}>
			<div className={styles.container}>
				<div>Name : {card.name}</div>
				<div>Email : {card.email}</div>
				<div>Phone number : {card.phoneNumber}</div>
				<Link section to="/usercard/changeinfo" className={styles.link}>
					<Button>
						Изменить данные
					</Button>
				</Link>
			</div>
		</div>
	);
}