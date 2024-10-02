import { format, parseISO } from 'date-fns';

export const useDateFormat = () => {
  const getFormattedDate = (isoDate, dateFormat = 'MMMM d, yyyy') => {
    try {
      const date = parseISO(isoDate);
      const formattedDate = format(date, dateFormat);
      return formattedDate;
    } catch {
      console.error('Invalid date format');
    }
  };

  return { getFormattedDate };
};
