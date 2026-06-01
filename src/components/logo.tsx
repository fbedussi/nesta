import styles from "./logo.module.css";

export function Logo({ size, iconOnly }: { size: number; iconOnly?: boolean }) {
	return (
		<div style={{ fontSize: `var(--font-size-${size})` }}>
			{!iconOnly && <span className={styles.text}>NESTA </span>}🐦
		</div>
	);
}
