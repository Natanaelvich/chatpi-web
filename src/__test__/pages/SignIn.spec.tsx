import React from 'react';
import { fireEvent, render, waitFor, screen } from '@testing-library/react';
import { useRouter } from 'next/router';
import SingnIn from '../../pages';

const mockedSignIn = jest.fn();
const mockedAddToast = jest.fn();

jest.mock('next/router', () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));

jest.mock('../../hooks/modules/ToastContext.tsx', () => {
  return {
    useToast: () => ({
      addToast: mockedAddToast,
    }),
  };
});

jest.mock('../../hooks/modules/AuthContext.tsx', () => {
  return {
    useAuth: () => ({
      signIn: mockedSignIn,
    }),
  };
});

describe('SignIn Page', () => {
  it('should be able to sign in', async () => {
    const mockRouter = {
      push: jest.fn(), // the component uses `router.push` only
    };

    (useRouter as jest.Mock).mockReturnValue(mockRouter);

    const { getByPlaceholderText, getByText } = render(<SingnIn />);

    const emailField = getByPlaceholderText('E-mail');
    const passwordField = getByPlaceholderText('Senha');
    const buttonElement = getByText('Entrar');

    fireEvent.change(emailField, {
      target: { value: 'johndoe@example.com' },
    });
    fireEvent.change(passwordField, { target: { value: '123456' } });

    fireEvent.click(buttonElement);

    await waitFor(() => expect(mockRouter.push).toHaveBeenCalledWith('/chat'));
  });
});
