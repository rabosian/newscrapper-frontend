/**
 * dateFormatter
 * parameter: string(date) type -> ex: 2024-11-11T20:47:33Z
 * return: string type -> ex: 6 hours ago
 */
export function dateFormatter(publishedAt) {
  const prev = new Date(publishedAt);
  const now = new Date();
  const timeDifference = now - prev;

  const m = Math.floor(timeDifference / (1000 * 60));
  const h = Math.floor(timeDifference / (1000 * 60 * 60));
  const d = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  // adding letter s at the end of the time
  let letter = 's';

  if (!d) {
    if (!h) {
      if (m === 1) letter = '';
      return `${m} minute${letter} ago`;
    } else {
      if (h === 1) letter = '';
      return `${h} hour${letter} ago`;
    }
  }

  if (d === 1) letter = '';
  return `${d} day${letter} ago`;
}
