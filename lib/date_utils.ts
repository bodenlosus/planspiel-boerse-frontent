export const toISODateOnly = (date: Date) => date.toISOString().slice(0, 10);

export const getCurrentDate = () => new Date();

export const getDateCertainDaysAgo = (days: number) => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date;
};

export const getDateOneWeekAgo = () => {
  const date = new Date();
  date.setDate(date.getDate() - 7);
  return date;
};