import React, { useState } from "react";
import styles from './Input.module.css';

export default function Input({ label, onChange, errorMessage, ...attrs }) {
	const [focused, setFocused] = useState(false);

	const handleFocus = (e) => {
		setFocused(true);
	}

	return (
		<div className={styles.item}>
			<label className={styles.label}>
				{label}
			</label>
			<input
				className={styles.input}
				onChange={onChange}
				onBlur={handleFocus}
				focused={focused.toString()}
				{...attrs}
			/>
			{errorMessage && <span>{errorMessage}</span>}
		</div>
	)
}