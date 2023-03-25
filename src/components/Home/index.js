import React, { useEffect, useState } from 'react';
import styles from './Home.module.css';
import { Link } from 'react-router-dom';
import Button from '../Button';
import List from '../List';


export default function Home() {
	const [data, setData] = useState([]);
	const [priceFrom, setPriceFrom] = useState();
	const [priceTo, setPriceTo] = useState();
	const [areaFrom, setAreaFrom] = useState();
	const [areaTo, setAreaTo] = useState();
	const [hotel, setHotel] = useState(false);
	const [appartment, setAppartment] = useState(false);
	const [room, setRoom] = useState(false);

	useEffect(() => {
		fetch("http://localhost:5000/list", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				"Access-Control-Allow-Origin": '*',
			},
		}).then((res) => res.json())
			.then((data) => {
				setData(data.data);
			})
	}, []);

	function handleSubmit(e) {
		e.preventDefault();
		const filter = {
			priceFrom: (priceFrom === 0 || priceFrom === undefined) ? 0 : priceFrom,
			priceTo: (priceTo === 0 || priceTo === undefined) ? 10000000 : priceTo,
			areaFrom: (areaFrom === 0 || areaFrom === undefined) ? 0 : areaFrom,
			areaTo: (areaTo === 0 || areaTo === undefined) ? 10000000 : areaTo,
			hotel: hotel === true ? { type: 'гостиничный номер' } : {},
			appartment: appartment === true ? { type: 'квартиры' } : {},
			room: room === true ? { type: 'комната' } : {},
		};
		console.log(filter);
		fetch("http://localhost:5000/filter", {
			method: "POST",
			crossDomain: true,
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				"Access-Control-Allow-Origin": '*',
			},
			body: JSON.stringify(
				filter
			),
		}).then((res) => res.json())
			.then((data) => {
				setData(data.data);
				console.log(data.data);
			})
	}

	return (
		<div className={styles.container}>
			<div className={styles.main}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<div className={styles.title}>Фильтр</div>
					<div className={styles.item}>
						<div className={styles.filter}>Цена:</div>
						<div className={styles.box}>
							<label className={styles.label}>От</label>
							<input className={styles.input}
								type="number" placeholder=""
								onChange={e => setPriceFrom(Number(e.target.value))}
							/>
						</div>
						<div className={styles.box}>
							<label className={styles.label}>До</label>
							<input className={styles.input}
								type="number" placeholder=""
								onChange={e => setPriceTo(Number(e.target.value))}
							/>
						</div>
					</div>
					<div className={styles.item}>
						<div className={styles.filter}>Площадь:</div>
						<div className={styles.box}>
							<label className={styles.label}>От</label>
							<input className={styles.input}
								type="number" placeholder=""
								onChange={e => setAreaFrom(Number(e.target.value))}
							/>
						</div>
						<div className={styles.box}>
							<label className={styles.label}>До</label>
							<input className={styles.input}
								type="number" placeholder=""
								onChange={e => setAreaTo(Number(e.target.value))}
							/>
						</div>
					</div>
					<div className={styles.item}>
						<div className={styles.filter}>Тип помещения:</div>
						<div className={styles.box}>
							<input className={styles.input} type="checkbox"
								onChange={e => setHotel(!hotel)}
							/>
							<label className={styles.label}>Гостиничный номер</label>
						</div>
						<div className={styles.box}>
							<input className={styles.input} type="checkbox"
								onChange={e => setAppartment(!appartment)}
							/>
							<label className={styles.label}>Квартира</label>
						</div>
						<div className={styles.box}>
							<input className={styles.input} type="checkbox"
								onChange={e => setRoom(!room)}
							/>
							<label className={styles.label}>Комната</label>
						</div>
					</div>
					<Button type="submit">Поиск</Button>
				</form>
				<List data={data} />
				<div className={styles.side}>
					<Link to="/login"><Button>Войти</Button></Link>
					<Link to="/registration"><Button>Зарегестрироваться</Button></Link>
				</div>
			</div>
		</div>
	);
}