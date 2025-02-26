export default function getStarsStyle(rating: number): string {
  return `${(Math.round(rating) * 20).toString()}%`;
}
