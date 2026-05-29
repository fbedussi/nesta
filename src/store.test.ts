import assert from "node:assert/strict";
import { describe, it } from "node:test";
import type { Model } from "./model.ts";
import { selectors } from "./store.ts";

const baseState: Model = {
	surveyCompleted: false,
	birdName: "",
	photos: [],
	surveyAnswers: { "1": null, "2": null, "3": null, "4": null, "5": null },
};

describe("selectors.profile", () => {
	it("returns undefined when no answers are set", () => {
		assert.equal(selectors.profile(baseState), undefined);
	});

	it("returns 'stress' when the majority of answers map to stress", () => {
		// q1->1 (stress), q2->1 (stress), q3->1 (stress)
		const state: Model = {
			...baseState,
			surveyAnswers: { "1": 1, "2": 1, "3": 1, "4": null, "5": null },
		};
		assert.equal(selectors.profile(state), "stress");
	});

	it("returns 'automatic' when the majority of answers map to automatic", () => {
		// q1->2 (automatic), q2->2 (automatic), q3->4 (automatic)
		const state: Model = {
			...baseState,
			surveyAnswers: { "1": 2, "2": 2, "3": 4, "4": null, "5": null },
		};
		assert.equal(selectors.profile(state), "automatic");
	});

	it("returns 'perfectionist' when the majority of answers map to perfectionist", () => {
		// q1->3 (perfectionist), q2->4 (perfectionist), q3->3 (perfectionist)
		const state: Model = {
			...baseState,
			surveyAnswers: { "1": 3, "2": 4, "3": 3, "4": null, "5": null },
		};
		assert.equal(selectors.profile(state), "perfectionist");
	});

	it("uses question 1 as a tiebreaker", () => {
		// q1->2 (automatic), q2->1 (stress), q3->3 (perfectionist) → three-way tie at 1
		// tiebreaker: q1="2" → matrix["1"]["2"] = "automatic" → automatic wins
		const state: Model = {
			...baseState,
			surveyAnswers: { "1": 2, "2": 1, "3": 3, "4": null, "5": null },
		};
		assert.equal(selectors.profile(state), "automatic");
	});

	it("ignores questions 4 and 5", () => {
		// q4 and q5 answered, but only q1–q3 count
		const state: Model = {
			...baseState,
			surveyAnswers: { "1": 1, "2": 1, "3": 1, "4": 4, "5": 4 },
		};
		assert.equal(selectors.profile(state), "stress");
	});
});
