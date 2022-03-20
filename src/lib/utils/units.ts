export const units = [
  {value: 1, singular: "second", plural: "seconds"},
  {value: 60, singular: "minute", plural: "minutes"},
  {value: 3600, singular: "hour", plural: "hours"},
  {value: 86400, singular: "day", plural: "days"},
  {value: 604800, singular: "week", plural: "weeks"},
  {value: 2592000, singular: "month", plural: "months"},
  {value: 7776000, singular: "quarter", plural: "quarters"},
  {value: 31536000, singular: "year", plural: "years"},
];

/** Looks up the label associated with `unitValue` and returns the singular or plural form based
 * on `value`.
 */
export function unitValueToLabel(value: string, unitValue: number): string {
  for(let i=0; i < units.length; i++) {
    if(units[i].value === unitValue) {
      return (value === "1" || value === "1.0") ? units[i].singular : units[i].plural;
    }
  }
  throw new Error("unexpected unit value");
}

/** Looks up the value in seconds associated with the given singular or plural `label`. **/
export function unitLabelToValue(label: string) {
  for(let i=0; i < units.length; i++) {
    if(units[i].singular === label || units[i].plural === label) {
      return units[i].value;
    }
  }
  throw new Error("unexpected unit label");
}