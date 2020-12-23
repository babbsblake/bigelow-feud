
export function validateNotNull(val, field, res) {
  if (val == null || val == undefined) {
    res.status(400).send(`Invalid input: ${field} cannot be null.`);
  }
  return val;
}
