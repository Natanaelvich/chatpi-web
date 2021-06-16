import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import Input from '@/components/Input';

jest.mock('@unform/core', () => {
  return {
    useField: () => ({
      fieldName: 'email',
      defaultValue: '',
      error: '',
      registerField: jest.fn(),
    }),
  };
});

describe('Input component', () => {
  it('should be able to render an input', async () => {
    const { getByPlaceholderText } = render(
      <Input name="email" placeholder="E-mail" />,
    );

    expect(getByPlaceholderText('E-mail')).toBeTruthy();
  });

  it('should render highlight on input focus', async () => {
    const { getByPlaceholderText, getByTestId } = render(
      <Input name="email" placeholder="E-mail" />,
    );

    const inputElement = getByPlaceholderText('E-mail');
    const containerElement = getByTestId('input-container');

    fireEvent.focus(inputElement);

    await waitFor(() => {
      expect(containerElement).toHaveStyle('border-color : #de595c');
      expect(containerElement).toHaveStyle('color : #de595c');
    });

    fireEvent.blur(inputElement);

    await waitFor(() => {
      expect(containerElement).not.toHaveStyle('border-color : #de595c');
      expect(containerElement).not.toHaveStyle('color : #de595c');
    });
  });
});
