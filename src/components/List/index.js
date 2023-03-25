import React from 'react';
import RoomCard from '../RoomCard';
import styles from './List.module.css';

export default function List({ data }) {
	return (
		<div className={styles.info}>
			{data.map((info) => {
				return (
					<RoomCard info={info} key={info._id} />
				)
			})}
		</div>
	);
}

