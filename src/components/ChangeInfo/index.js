import React from 'react';
import styles from './ChangeInfo.module.css';
import Button from '../Button';
import { useForm } from 'react-hook-form';


export default function ChangeInfo() {
	const {
		register,
		formState: {
			errors,
		},
		handleSubmit,
	} = useForm({
		mode: "onBlur",
	});

	const onSubmit = (inputs) => {
		console.log('yes')
		fetch("http://localhost:5000/changeinfo", {
			method: "PATCH",
			crossDomain: true,
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				"Access-Control-Allow-Origin": '*',
			},
			body: JSON.stringify({
				...inputs,
				token: window.localStorage.getItem("token"),
			}),
		}).then((res) => res.json())
			.then((data) => {
				window.localStorage.setItem("token", data.token);
			}).finally(() => {
				window.location.href = "../usercard";
			})
	}

	return (
		<div className={styles.content} >
			<div className={styles.container}>
				<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
					<div className={styles.item}>
						<label className={styles.label}>
							Имя:
						</label>
						<input
							type="text"
							{...register("name", {
								required: true,
								minLength: {
									value: 1,
									message: "Имя не должно быть пустым",
								}
							})}
							className={styles.input}
						/>
						<div className={styles.error}>
							{errors?.name && <div>{errors?.name?.message || "Error"}</div>}
						</div>
					</div>
					<div className={styles.item}>
						<label className={styles.label}>
							Почта:
						</label>
						<input
							type="email"
							{...register("email", {
								required: true,
								pattern: {
									value: /([a-z0-9._%+-]{3,})+@([a-z0-9.-]{3,})+[.][a-z]{2,3}$/,
									message: "Некорректный адрес почты",
								}
							})}
							className={styles.input}
						/>
						<div className={styles.error}>
							{errors?.email && <div>{errors?.email?.message || "Error"}</div>}
						</div>
					</div>
					<div className={styles.item}>
						<label className={styles.label}>
							Номер телефона:
						</label>
						<input
							type="tel"
							{...register("phoneNumber", {
								required: true,
								pattern: {
									value: /^[+]+79+(.{9})/,
									message: "Некорректный номер",
								}
							})}
							className={styles.input}
						/>
						<div className={styles.error}>
							{errors?.phoneNumber && <div>{errors?.phoneNumber?.message || "Error"}</div>}
						</div>
					</div>
					<div className={styles.item}>
						<label className={styles.label}>
							Пароль:
						</label>
						<input
							type="password"
							{...register("password", {
								required: true,
								minLength: {
									value: 8,
									message: "Пароль должен содержать не меньше 8 символов",
								}
							})}
							className={styles.input}
						/>
						<div className={styles.error}>
							{errors?.password && <div>{errors?.password?.message || "Error"}</div>}
						</div>
					</div>
					<Button type="submit">Сохранить</Button>
				</form>
			</div>
		</div>
	);
}