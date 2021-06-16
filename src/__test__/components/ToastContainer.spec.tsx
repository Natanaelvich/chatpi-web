import React from 'react';
import { render } from '@testing-library/react';
import { ToastMessage } from '@/hooks/modules/ToastContext';
import ToastContainer from '@/components/ToastContainer';

const messages: ToastMessage[] = [
  {
    id: '1',
    title: 'test1',
    description: 'test desc 1',
    type: 'error',
  },
  {
    id: '2',
    title: 'test2',
    description: 'test desc 2',
    type: 'success',
  },
  {
    id: '3',
    title: 'test3',
    description: 'test desc 3',
    type: 'info',
  },
];

const mockedRemoveToast = jest.fn();

jest.mock('../../hooks/modules/ToastContext.tsx', () => {
  return {
    useToast: () => ({
      removeToast: mockedRemoveToast,
    }),
  };
});

describe('ToastContainer component', () => {
  it('should be able to see toasts', async () => {
    const { getByText } = render(<ToastContainer messages={messages} />);

    expect(getByText('test1')).toBeTruthy();
    expect(getByText('test2')).toBeTruthy();
    expect(getByText('test3')).toBeTruthy();
  });
});
