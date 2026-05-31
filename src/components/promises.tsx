import { useEffect, useRef, useState, type TouchEventHandler } from "react";
import { useTranslation } from "react-i18next";
import styles from "./promises.module.css";

const INTERVAL = 2000;

export function Promises() {
	const { t } = useTranslation();

	const intervalId = useRef<number | null>(null);
	const [selectedSlide, setSelectedSlide] = useState(0);

	const prevXPos = useRef<number | null>(null);

	useEffect(() => {
		if (!intervalId.current) {
			intervalId.current = setInterval(() => {
				setSelectedSlide((selectedSlide) => (selectedSlide + 1) % 5);
			}, INTERVAL);
		}

		() => intervalId.current && window.clearInterval(intervalId.current);
	}, []);

	const onManualClick = (id: number) => {
		if (intervalId.current) {
			window.clearInterval(intervalId.current);
			intervalId.current = null;
		}

		setSelectedSlide(id);
	};

	const onTouchStart: TouchEventHandler<HTMLDivElement> = (ev) => {
		if (ev.touches.length === 1) {
			if (intervalId.current) {
				window.clearInterval(intervalId.current);
				intervalId.current = null;
			}

			prevXPos.current = ev.touches[0].clientX;
		}
	};

	const onTouchEnd: TouchEventHandler<HTMLDivElement> = (ev) => {
		if (prevXPos.current === null) {
			return;
		}

		if (ev.changedTouches.length === 1) {
			if (ev.changedTouches[0].clientX < prevXPos.current) {
				setSelectedSlide((selectedSlide) => (selectedSlide + 1) % 5);
			} else {
				setSelectedSlide((selectedSlide) => (selectedSlide - 1) % 5);
			}
		}
	};

	const promises = [
		t("promise1"),
		t("promise2"),
		t("promise3"),
		t("promise4"),
		t("promise5"),
	];

	return (
		<div
			className={styles.container}
			onTouchStart={onTouchStart}
			onTouchEnd={onTouchEnd}
		>
			<div className={styles.inner}>
				{promises.map((promise, index) => (
					// biome-ignore lint/suspicious/noArrayIndexKey: it's ok
					<div key={index} className={styles.contents}>
						<div>{promise}</div>
					</div>
				))}
			</div>
			<div className={styles["nav-wrapper"]}>
				{promises.map((_, index) => (
					<input
						// biome-ignore lint/suspicious/noArrayIndexKey: it's ok
						key={index}
						type="radio"
						name="slider"
						checked={index === selectedSlide}
						className={styles.nav}
						onChange={() => onManualClick(index)}
					/>
				))}
			</div>
		</div>
	);
}
