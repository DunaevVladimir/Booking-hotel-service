import React from 'react';
import styles from './Card.module.css';
import Button from '../Button';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Card() {
	const { id } = useParams();
	const [card, setCard] = useState([]);
	const buttonMessage = 'Написать сообщение арендодателю';

	useEffect(() => {
		fetch(`http://localhost:5000/list/${id}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				"Access-Control-Allow-Origin": '*',
			},
		}).then((res) => res.json())
			.then((data) => {
				setCard(data);
			})
	}, [id]);

	return (
		<div className={styles.wrapper}>
			<div className={styles.card}>
				<div className={styles.title}>{card.title}</div>
				<div className={styles.gallery}>
					<div className={styles.mainimage}>
						<img className={styles.img} src={require("../../images/1.webp")} alt="main-img" />
					</div>
					<div className={styles.smallimages}>
						<div className={styles.smallimage}>
							<img className={styles.img} src={require("../../images/2.webp")} alt="gallery-img" />
						</div>
						<div className={styles.smallimage}>
							<img className={styles.img} src={require("../../images/3.webp")} alt="gallery-img" />
						</div>
						<div className={styles.smallimage}>
							<img className={styles.img} src={require("../../images/4.webp")} alt="gallery-img" />
						</div>
					</div>
				</div>
				<div className={styles.content}>
					<div className={styles.main}>
						<div className={styles.price}>{card.price + ' р'}</div>
						<div className={styles.area}>{card.area + ' м'}</div>
						<div className={styles.adress}>{card.adress}</div>
						<div className={styles.description}>{card.description}</div>
					</div>
					<Button>{buttonMessage}</Button>
				</div>
			</div>
		</div>
	);
}