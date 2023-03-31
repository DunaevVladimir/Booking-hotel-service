import React from 'react';
import '../../styles/container-center.css';
import '../../styles/form.scss';
import Button from '../Button';
import ReCAPTCHA from 'react-google-recaptcha';
import { useForm } from 'react-hook-form';

export default function Registration() {
	const {
		register,
		formState: {
			errors,
		},
		handleSubmit,
		getValues,
	} = useForm({
		mode: "onBlur",
	});

	const onSubmit = (inputs) => {
		fetch("http://localhost:5000/registration", {
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
					window.location.href = "./registrationSuccessful";
				}
			})
	}

	const onChange = () => {

	}

	return (

		<div className="container-center">
			<form className="form" onSubmit={handleSubmit(onSubmit)}>
				<div className="form__item">
					<label className="form__label">
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
						className="form__input"
					/>
					{errors?.name && <div className="form__error">{errors?.name?.message || "Error"}</div>}
				</div>
				<div className="form__item">
					<label className="form__label">
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
						className="form__input"
					/>
					{errors?.email && <div className="form__error">{errors?.email?.message || "Error"}</div>}
				</div>
				<div className="form__item">
					<label className="form__label">
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
						className="form__input"
					/>
					{errors?.phoneNumber && <div className="form__error">{errors?.phoneNumber?.message || "Error"}</div>}
				</div>
				<div className="form__item">
					<label className="form__label">
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
						className="form__input"
					/>
					{errors?.password && <div className="form__error">{errors?.password?.message || "Error"}</div>}
				</div>
				<div className="form__item">
					<label className="form__label">
						Повторите пароль:
					</label>
					<input
						type="password"
						{...register("passwordCheck", {
							required: true,
							minLength: {
								value: 8,
								message: "Пароль должен содержать не меньше 8 символов",
							},
							validate: (value) =>
								value === getValues("password") ||
								'Пароли не совпадают',
						})}
						className="form__input"
					/>
					{errors?.passwordCheck && <div className="form__error">{errors?.passwordCheck?.message || "Error"}</div>}
				</div>
				<div className='form__item'>
					<ReCAPTCHA sitekey='6LfDoRglAAAAAA6YnZSQ32v4i4yN4ZY5nyBm_WEo' onChange={onChange} />
				</div>
				<div className='form__item'>
					<Button type="submit">Регистрация</Button>
				</div>
			</form>
		</div>
	);
}