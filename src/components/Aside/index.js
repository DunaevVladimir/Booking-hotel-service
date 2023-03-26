import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button';
import styles from './Aside.module.css'

export default function Aside() {
	return (
		<aside className={styles.aside}>
			<Link to="/login"><Button>Войти</Button></Link>
			<Link to="/registration"><Button>Зарегестрироваться</Button></Link>
		</aside>
	);
}