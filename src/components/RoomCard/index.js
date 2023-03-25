import React from 'react';
import styles from './RoomCard.module.css';
import { NavLink } from 'react-router-dom';

export default class RoomCard extends React.Component {
	constructor({ info }) {
		super();
		this.state = {
			id: info._id,
			title: info.title,
			price: info.price,
			area: info.area,
			adress: info.adress,
			description: info.description,
			type: info.type,
			buttonMessage: 'Написать сообщение арендодателю',
		};
	}

	render() {
		return (
			<div className={styles.card}>
				<NavLink to={'/list/' + this.state.id}>
					<div className={styles.title}>{this.state.title}</div>
					<div className={styles.gallery}>
						<div className={styles.mainimage}>
							<img className={styles.img} src={require("../../images/1.webp")} />
						</div>
					</div>
				</NavLink>
				<div className={styles.content}>
					<div className={styles.main}>
						<div className={styles.price}>{this.state.price + ' р'}</div>
						<div className={styles.area}>{this.state.area + ' м'}</div>
						<div className={styles.adress}>{this.state.adress}</div>
						<div className={styles.description}>{this.state.description}</div>
					</div>
				</div>
			</div>
		);
	}
}
