import React from 'react';
import styles from './Button.module.css';

function Button(props) {
	return (
		<button
			type={props.type ? props.type : "button"}
			className={styles.btn}
		>
			{props.children}
		</button>
	);
}

export default Button;