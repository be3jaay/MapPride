import { useDateFormat } from '../../core/hooks/use-date';
import { format, parseISO } from 'date-fns';

jest.mock('date-fns', () => ({
  format: jest.fn(),
  parseISO: jest.fn(),
}));

describe('useDateFormat', () => {
  const { getFormattedDate } = useDateFormat();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should format a valid ISO date string', () => {
    const isoDate = '2023-10-01T00:00:00.000Z';
    const dateFormat = 'MMMM d, yyyy';
    const parsedDate = new Date(isoDate);
    const formattedDate = 'October 1, 2023';

    parseISO.mockReturnValue(parsedDate);
    format.mockReturnValue(formattedDate);

    const result = getFormattedDate(isoDate, dateFormat);

    expect(parseISO).toHaveBeenCalledWith(isoDate);
    expect(format).toHaveBeenCalledWith(parsedDate, dateFormat);
    expect(result).toBe(formattedDate);
  });

  it('should use default date format if none is provided', () => {
    const isoDate = '2023-10-01T00:00:00.000Z';
    const defaultDateFormat = 'MMMM d, yyyy';
    const parsedDate = new Date(isoDate);
    const formattedDate = 'October 1, 2023';

    parseISO.mockReturnValue(parsedDate);
    format.mockReturnValue(formattedDate);

    const result = getFormattedDate(isoDate);

    expect(parseISO).toHaveBeenCalledWith(isoDate);
    expect(format).toHaveBeenCalledWith(parsedDate, defaultDateFormat);
    expect(result).toBe(formattedDate);
  });

  it('should handle invalid ISO date string', () => {
    const invalidIsoDate = 'invalid-date';
    console.error = jest.fn();

    parseISO.mockImplementation(() => {
      throw new Error('Invalid date');
    });

    const result = getFormattedDate(invalidIsoDate);

    expect(parseISO).toHaveBeenCalledWith(invalidIsoDate);
    expect(console.error).toHaveBeenCalledWith('Invalid date format');
    expect(result).toBeUndefined();
  });
});
