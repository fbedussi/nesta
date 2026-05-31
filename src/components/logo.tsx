import styles from "./logo.module.css";

export function Logo({ size }: { size: number }) {
	return (
		<div style={{ fontSize: `var(--font-size-${size})` }}>
			<span className={styles.text}>NESTA</span> 🐦
		</div>
	);
}
