import React from 'react';
import styles from './Filter.module.css';
import Button from '../Button';

export default class Filter extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			priceFrom: 0,
			priceTo: 0,
			areaFrom: 0,
			areaTo: 0,
			hotel: false,
			appartment: false,
			room: false,
		}
	}

	render() {
		return (
			<form className={styles.form}>
				<div className={styles.title}>Фильтр</div>
				<div className={styles.item}>
					<div className={styles.filter}>Цена:</div>
					<div className={styles.box}>
						<label className={styles.label}>От</label>
						<input className={styles.input} type="number" placeholder=""
							onChange={e => this.setState({ priceFrom: e.target.value })}
						/>
					</div>
					<div className={styles.box}>
						<label className={styles.label}>До</label>
						<input className={styles.input} type="number" placeholder=""
							onChange={e => this.setState({ priceTo: e.target.value })}
						/>
					</div>
				</div>
				<div className={styles.item}>
					<div className={styles.filter}>Площадь:</div>
					<div className={styles.box}>
						<label className={styles.label}>От</label>
						<input className={styles.input} type="number" placeholder=""
							onChange={e => this.setState({ priceFrom: e.target.value })}
						/>
					</div>
					<div className={styles.box}>
						<label className={styles.label}>До</label>
						<input className={styles.input} type="number" placeholder=""
							onChange={e => this.setState({ priceTo: e.target.value })}
						/>
					</div>
				</div>
				<div className={styles.item}>
					<div className={styles.filter}>Тип помещения:</div>
					<div className={styles.box}>
						<input className={styles.input} type="checkbox"
							onChange={e => this.setState({ hotel: !this.state.hotel })}
						/>
						<label className={styles.label}>Гостиничный номер</label>
					</div>
					<div className={styles.box}>
						<input className={styles.input} type="checkbox"
							onChange={e => this.setState({ appartment: !this.state.appartment })}
						/>
						<label className={styles.label}>Квартира</label>
					</div>
					<div className={styles.box}>
						<input className={styles.input} type="checkbox"
							onChange={e => this.setState({ room: !this.state.room })}
						/>
						<label className={styles.label}>Комната</label>
					</div>
				</div>
				<Button type="submit">Поиск</Button>
			</form>
		);
	}
}