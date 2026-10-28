export function formatMoney(value: number): string {
  return `${String(Math.round(value)).replace(/\B(?=(\d{3})+(?!\d))/g, '.')} đ`;
}

const pad = (n: number) => String(n).padStart(2, '0');

export function formatDateTime(date: Date): string {
  return `${pad(date.getHours())}:${pad(date.getMinutes())} ${pad(date.getDate())}/${pad(
    date.getMonth() + 1,
  )}/${date.getFullYear()}`;
}
