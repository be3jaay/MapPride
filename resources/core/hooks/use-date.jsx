import React from 'react';
import { format, parseISO } from 'date-fns';

export const useDateFormat = () => {
  const getFormattedDate = (isoDate, dateFormat = 'MMMM d, yyyy') => {
    /**
     * Check this page documentation for formatting dates
     * https://date-fns.org/v2.29.3/docs/format
     */

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
