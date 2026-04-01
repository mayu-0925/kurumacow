export function currentYear(): number {
  return new Date().getFullYear();
}

export function currentYearMonth(): string {
  const d = new Date();
  return `${d.getFullYear()}年${d.getMonth() + 1}月`;
}
