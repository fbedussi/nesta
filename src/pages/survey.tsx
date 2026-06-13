import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Logo } from "../components/logo";
import { navigate } from "../router";
import { actions, selectors, useStore } from "../store";
import styles from "./survey.module.css";

export function Survey() {
	const { t } = useTranslation();
	const surveyCompletedQuestions = useStore(selectors.surveyCompletedQuestions);

	const numberOfAnswersPerQuestion = [4, 4, 4, 3, 4];

	useEffect(() => {
		if (surveyCompletedQuestions === 5) {
			navigate("/loading");
		}
	}, [surveyCompletedQuestions]);

	return (
		<div className={`page-wrapper ${styles.container}`}>
			<div className={styles["title-wrapper"]}>
				<Logo size={8} iconOnly />
				<h1 className={styles.title}>{t("surveyTitle")}</h1>
			</div>

			<div className={styles.progress}>
				<progress
					className={styles["progress-bar"]}
					max={5}
					value={Math.min(5, surveyCompletedQuestions + 1)}
				/>
				<div className={styles["progress-text"]}>
					{surveyCompletedQuestions + 1}/5
				</div>
			</div>

			<div className={styles.questions}>
				{numberOfAnswersPerQuestion.map((numberOfAnswers, index) => (
					<Question
						// biome-ignore lint/suspicious/noArrayIndexKey: the position is the right id
						key={index}
						questionId={index + 1}
						numberOfAnswers={numberOfAnswers}
						className={
							index === surveyCompletedQuestions
								? styles.active
								: styles.inactive
						}
					/>
				))}
			</div>
		</div>
	);
}

function Question({
	className,
	questionId,
	numberOfAnswers,
}: {
	className?: string;
	questionId: number;
	numberOfAnswers: number;
}) {
	const { t } = useTranslation();
	const answers = new Array(numberOfAnswers).fill(undefined);

	return (
		<div className={[className, styles["question-wrapper"]].join(" ")}>
			<div className={styles.question}>
				{t(`question${questionId}_question`)}
			</div>
			<div className={styles.answers}>
				{answers.map((_, answerId) => (
					// biome-ignore lint/suspicious/noArrayIndexKey: the position is the right id
					<label key={answerId} className={styles.answer}>
						<input
							type="radio"
							name={`question${questionId}_answer`}
							onChange={async () => {
								await actions.setSurveyAnswer(questionId, answerId + 1);
							}}
						/>
						<span>{t(`question${questionId}_answer${answerId + 1}`)}</span>
					</label>
				))}
			</div>
		</div>
	);
}
