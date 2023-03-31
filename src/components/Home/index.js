import React, { useEffect, useState } from 'react';
import styles from './Home.module.css';
import List from '../List';
import Aside from '../Aside';
import Filter from '../Filter';

export default function Home() {
	const [data, setData] = useState([]);
	const noFilterResult = <p>К сожалению не найдено ни одного варианта, попробуйте изменить настройки фильтра</p>;

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

	function filterOut(inputs) {
		const { priceFrom, priceTo, areaFrom, areaTo, hotel, appartment, room } = inputs;
		const filterSetting = {
			priceFrom: (priceFrom === 0 || priceFrom === undefined) ? 0 : priceFrom,
			priceTo: (priceTo === 0 || priceTo === undefined) ? 10000000 : priceTo,
			areaFrom: (areaFrom === 0 || areaFrom === undefined) ? 0 : areaFrom,
			areaTo: (areaTo === 0 || areaTo === undefined) ? 10000000 : areaTo,
			hotel: hotel === true ? { type: 'гостиничный номер' } : {},
			appartment: appartment === true ? { type: 'квартиры' } : {},
			room: room === true ? { type: 'комната' } : {},
		};
		fetch("http://localhost:5000/filter", {
			method: "POST",
			crossDomain: true,
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				"Access-Control-Allow-Origin": '*',
			},
			body: JSON.stringify(
				filterSetting
			),
		}).then((res) => res.json())
			.then((data) => {
				setData(data.data);
			})
	}

	return (
		<div className={styles.container}>
			<div className={styles.main}>
				<Filter filterOut={filterOut} />
				{
					data.length === 0
						? noFilterResult
						: <List data={data} />
				}
				<Aside />
			</div>
		</div>
	);
}