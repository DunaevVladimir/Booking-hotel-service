import React from 'react';
import '../../styles/container-center.css';
import '../../styles/form.scss';
import Button from '../Button';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

export default function Login() {
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
				if (data.status === "ok") {
					window.localStorage.setItem("token", data.data);
					window.location.href = "./usercard";
				}
			})
	}

	return (
		<div className="container-center">
			<form className="form" onSubmit={handleSubmit(onSubmit)}>
				<div className="form__item">
					<label className="form__label">
						Почта:
					</label>
					<input
						type="email"
						{...register("email", {
							required: "Почта не указана"
						})}
						className="form__input"
						placeholder="Введите email"
					/>
					{errors?.email && <div className="form__error">{errors?.email?.message || "Поле не может быть пустым"}</div>}
				</div>
				<div className="form__item">
					<label className="form__label">
						Пароль:
					</label>
					<input
						type="password"
						{...register("password", {
							required: "Введите пароль"
						})}
						className="form__input"
						placeholder="Введите пароль"
					/>
					{errors?.password && <div className="form__error">{errors?.password?.message || "Поле не может быть пустым"}</div>}
				</div>
				<div className='form__item'>
					<Button type="submit">Войти</Button>
				</div>
				<div className='form__item'>
					<Link section to="/registration">
						<Button>
							Зарегистрироваться
						</Button>
					</Link>
				</div>
			</form>
		</div>
	);
}