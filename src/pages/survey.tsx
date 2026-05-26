import { useTranslation } from "react-i18next";
import { Link } from "../router";
import { actions, selectors, useStore } from "../store";
import styles from "./survey.module.css";

export function Survey() {
	const { t } = useTranslation();
	const surveyCompletedPercentage = useStore(
		selectors.surveyCompletedPercentage,
	);

	const numberOfAnswersPerQuestion = [4, 4, 4, 3, 4];

	return (
		<div>
			<p>{t("survey")}</p>

			<div className={styles.questions}>
				{numberOfAnswersPerQuestion.map((numberOfAnswers, index) => (
					<Question
						// biome-ignore lint/suspicious/noArrayIndexKey: the position is the right id
						key={index}
						questionId={index + 1}
						numberOfAnswers={numberOfAnswers}
					/>
				))}
			</div>

			<div>
				<progress max={100} value={surveyCompletedPercentage} />
			</div>

			{surveyCompletedPercentage === 100 && (
				<div>
					<Link href="/loading">{t("proceed")}</Link>
				</div>
			)}
		</div>
	);
}

function Question({
	questionId,
	numberOfAnswers,
}: {
	questionId: number;
	numberOfAnswers: number;
}) {
	const { t } = useTranslation();
	const answers = new Array(numberOfAnswers).fill(undefined);

	return (
		<div>
			<div className={styles.question}>
				{t(`question${questionId}_question`)}
			</div>
			<div className={styles.answers}>
				{answers.map((_, answerId) => (
					// biome-ignore lint/suspicious/noArrayIndexKey: the position is the right id
					<label key={answerId}>
						<input
							type="radio"
							name={`question${questionId}_answer`}
							onChange={() => {
								actions.setSurveyAnswer(questionId, answerId + 1);
							}}
						/>
						<span>{t(`question${questionId}_answer${answerId + 1}`)}</span>
					</label>
				))}
			</div>
		</div>
	);
}
