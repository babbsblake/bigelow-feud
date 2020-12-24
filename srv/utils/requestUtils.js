import surveys from '../data/surveys.json';

export function validateNotNull(val, field, res) {
  if (val == null || val == undefined) {
    res.status(400).send(`Invalid input: ${field} cannot be null.`);
  }
  return val;
}

export function getSurvey(sid) {
  let filteredSurveys = surveys.surveys.filter(survey => survey.sid == sid);
  if (filteredSurveys.length != 1) {
    return undefined;
  } else {
    return filteredSurveys[0];
  }
}
