import React, { useState } from 'react';
import styles from './Filter.module.css';
import '../../styles/form.scss';
import Button from '../Button';

export default function Filter(props) {
	const [filter, setFilter] = useState({
		priceFrom: undefined,
		priceTo: undefined,
		areaFrom: undefined,
		areaTo: undefined,
		hotel: false,
		appartment: false,
		room: false,
	});

	const onSubmit = (e) => {
		e.preventDefault();
		props.filterOut(filter);
	}

	return (
		<form className={styles.form} onSubmit={onSubmit}>
			<div className={styles.title}>Фильтр</div>
			<div className={styles.item}>
				<div className={styles.text}>Цена:</div>
				<div className={styles.filter}>
					<label className={styles.text}>От</label>
					<input
						type="number"
						className={styles.input}
						onChange={e => setFilter({ ...filter, priceFrom: Number(e.target.value) })}
					/>
				</div>
				<div className={styles.filter}>
					<label className={styles.text}>До</label>
					<input
						type="number"
						className={styles.input}
						onChange={e => setFilter({ ...filter, priceTo: Number(e.target.value) })}
					/>
				</div>
			</div>
			<div className={styles.item}>
				<div className={styles.text}>Площадь:</div>
				<div className={styles.filter}>
					<label className={styles.text}>От</label>
					<input
						type="number"
						className={styles.input}
						onChange={e => setFilter({ ...filter, areaFrom: Number(e.target.value) })}
					/>
				</div>
				<div className={styles.filter}>
					<label className={styles.text}>До</label>
					<input
						type="number"
						className={styles.input}
						onChange={e => setFilter({ ...filter, areaTo: Number(e.target.value) })}
					/>
				</div>
			</div>
			<div className={styles.item}>
				<div className={styles.text}>Тип помещения:</div>
				<div className={styles.filter}>
					<input
						type="checkbox"
						className={styles.checkbox}
						id="hotel"
						onChange={e => setFilter({ ...filter, hotel: !filter.hotel })}
					/>
					<label htmlFor="hotel" className={styles.label}>Гостиничный номер</label>
				</div>
				<div className={styles.filter}>
					<input
						type="checkbox"
						className={styles.checkbox}
						id="appartment"
						onChange={e => setFilter({ ...filter, appartment: !filter.appartment })}
					/>
					<label htmlFor="appartment" className={styles.label}>Квартира</label>
				</div>
				<div className={styles.filter}>
					<input
						type="checkbox"
						className={styles.checkbox}
						id="room"
						onChange={e => setFilter({ ...filter, room: !filter.room })}
					/>
					<label htmlFor="room" className={styles.label}>Комната</label>
				</div>
			</div>
			<Button type="submit">Поиск</Button>
		</form>
	);
}