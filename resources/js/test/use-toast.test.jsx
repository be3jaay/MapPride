import { renderHook, act } from '@testing-library/react-hooks';
import { useToastNotifications } from '../../core/hooks/use-toast';
import { toast } from 'react-toastify';

jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe('useToastNotifications', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call toast.success with the correct message when notifySuccess is called', () => {
    const { result } = renderHook(() => useToastNotifications());

    act(() => {
      result.current.notifySuccess('Success message');
    });

    expect(toast.success).toHaveBeenCalledWith('Success message');
  });

  it('should call toast.error with the correct message when notifyError is called', () => {
    const { result } = renderHook(() => useToastNotifications());

    act(() => {
      result.current.notifyError('Error message');
    });

    expect(toast.error).toHaveBeenCalledWith('Error message');
  });
});
