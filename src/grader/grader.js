import { Expectation } from "../types.js";
import {
  GRADE_CHART,
  LIKELIHOOD_INDICATOR_CHART,
  SCORE_TABLE,
  TEST_TOPIC_LINKS,
} from "./charts.js";

/**
 * @typedef {Object} GradeAndLikelihood
 * @property {number} score
 * @property {string} grade
 * @property {string} likelihoodIndicator
 */

/**
 *
 * @param {number} score - raw score based on all of the tests
 * @returns {GradeAndLikelihood} - normalized score, grade and likelihood_indicator
 */
export function getGradeAndLikelihoodForScore(score) {
  score = Math.max(score, 0);

  // If score>100, just use the grade for 100, otherwise round down to the nearest multiple of 5
  const grade = GRADE_CHART.get(Math.min(score - (score % 5), 100));
  const likelihoodIndicator =
    LIKELIHOOD_INDICATOR_CHART.get(grade.slice(0, 1)) ?? "UNKNOWN";

  return {
    score,
    grade,
    likelihoodIndicator,
  };
}

/**
 * @param {Expectation} expectation
 * @returns {string}
 */
export function getScoreDescription(expectation) {
  return SCORE_TABLE.get(expectation)?.description;
}

/**
 * @param {Expectation} expectation
 * @returns {string}
 */
export function getRecommendation(expectation) {
  return SCORE_TABLE.get(expectation)?.recommendation;
}

/**
 * @param {string} testName
 * @returns {string}
 */
export function getTopicLink(testName) {
  return TEST_TOPIC_LINKS.get(testName);
}

/**
 * @param {Expectation} expectation
 * @returns {number}
 */
export function getScoreModifier(expectation) {
  return SCORE_TABLE.get(expectation).modifier;
}

//
// Helper function to line up score table and expectations
export function matchScoreTableAndExpectations() {
  for (const exp of Object.values(Expectation)) {
    if (!SCORE_TABLE.get(exp)) {
      console.log(`No entry in SCORE_TABLE for Expectation ${exp}`);
    }
  }
  const eset = new Set(Object.values(Expectation));
  SCORE_TABLE.forEach((_, key) => {
    if (!eset.has(key)) {
      console.log(`Expectation '${key}' has no matching entry in SCORE_TABLE`);
    }
  });
}
