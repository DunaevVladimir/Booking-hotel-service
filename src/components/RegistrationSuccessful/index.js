import React from 'react';
import styles from './RegistrationSuccessful.module.css';
import { Link } from 'react-router-dom';

function RegistrationSuccessful() {
	return (
		<div className={styles.content}>
			<div className={styles.container}>
				<div className={styles.title}>Регистрация пройдена успешно! Для полноценного использования сайта
					<Link section to="/login" className={styles.link}> авторизуйтесь</Link>
				</div>
			</div>
		</div>
	);
}
export default RegistrationSuccessful;