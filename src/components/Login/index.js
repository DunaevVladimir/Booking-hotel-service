import React from 'react';
import styles from '../Registration/Registration.module.css';
import Button from '../Button';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

export default function NLogin() {
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
		console.log(inputs);
		fetch("http://localhost:5000/login", {
			method: "POST",
			crossDomain: true,
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				"Access-Control-Allow-Origin": '*',
			},
			body: JSON.stringify({
				...inputs
			}),
		}).then((res) => res.json())
			.then((data) => {
				console.log(data, "UserRegister");
				if (data.status === "ok") {
					window.localStorage.setItem("token", data.data);
					window.location.href = "./usercard";
				}
			})
	}

	return (
		<div className={styles.content} >
			<div className={styles.container}>
				<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
					<div className={styles.item}>
						<label className={styles.label}>
							Почта:
						</label>
						<input
							type="email"
							{...register("email", {
								required: "Почта не указана"
							})}
							className={styles.input}
							placeholder="Введите email"
						/>
						<div className={styles.error}>
							{errors?.email && <div>{errors?.email?.message || "Поле не может быть пустым"}</div>}
						</div>
					</div>
					<div className={styles.item}>
						<label className={styles.label}>
							Пароль:
						</label>
						<input
							type="password"
							{...register("password", {
								required: "Введите пароль"
							})}
							className={styles.input}
							placeholder="Введите пароль"
						/>
						<div className={styles.error}>
							{errors?.password && <div>{errors?.password?.message || "Поле не может быть пустым"}</div>}
						</div>
					</div>
					<Button type="submit">Войти</Button>
					<Link section to="/registration" className={styles.link}>
						<Button>
							Зарегистрироваться
						</Button>
					</Link>
				</form>
			</div>
		</div>
	);
}