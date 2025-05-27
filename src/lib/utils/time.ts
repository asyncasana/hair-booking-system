/**
 * Parses a time string like "12:30 PM" into 24-hour hours and minutes.
 * Returns null if the format is invalid.
 */
export function parseTimeString(
  time: string
): { hours: number; minutes: number } | null {
  const match = /^(\d{1,2}):(\d{2})\s?(AM|PM)$/i.exec(time.trim());
  if (!match) return null;

  // TypeScript now knows match is not null
  const [, h, m, mod = ""] = match;
  let hours = Number(h);
  const minutes = Number(m);
  const modifier = mod.toUpperCase();

  if (modifier === "PM" && hours < 12) hours += 12;
  if (modifier === "AM" && hours === 12) hours = 0;

  if (isNaN(hours) || isNaN(minutes)) return null;
  return { hours, minutes };
}

/**
 * Adds minutes to an ISO date string and returns a new ISO string.
 */
export function addMinutesToISOString(isoString: string, minutes: number): string {
  const date = new Date(isoString);
  if (isNaN(date.getTime())) throw new Error("Invalid date string");
  date.setMinutes(date.getMinutes() + minutes);
  return date.toISOString();
}