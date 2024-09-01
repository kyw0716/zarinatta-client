import dayjs from 'dayjs';

export const useDatePicker = (year: number, startMonth: number, startDate: number) => {
  const endDateOfMonth = dayjs(`${year}-${startMonth}-${startDate}`).endOf('month').date();
  const startDayOfMonth = dayjs(`${year}-${startMonth}-1`).day();
  const datesOfMonth = Array.from({ length: endDateOfMonth }).map((_, i) => i + 1);
  const dateCells = [...Array.from({ length: startDayOfMonth }).map(() => 0), ...datesOfMonth];
  const dateRows = dateCells.reduce((prev, cur, i) => {
    const index = Math.floor(i / 7);
    if (Array.isArray(prev[index])) prev[index].push(cur);
    else prev[index] = [cur];
    return prev;
  }, [] as number[][]);

  return { dateRows };
};
