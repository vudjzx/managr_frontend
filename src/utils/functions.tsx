export function formatDate(date: string): string {
  const config: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const formatedDate = new Date(date.split('T')[0].split('-').toString());
  return formatedDate.toLocaleString('en-US', config);
}
