
export function validateNotNull(val, field, res) {
  if (val == null) {
    res.status(400);
    res.send(`Invalid input: ${field} cannot be null.`);
  }
  return val;
}
