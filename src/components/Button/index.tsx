import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: number;
};

const Button: React.FC<ButtonProps> = ({ children, loading, ...rest }) => {
  return (
    <Container loading={loading}>
      <button disabled={Boolean(loading)} type="button" {...rest}>
        {loading ? '...' : children}
      </button>
    </Container>
  );
};

export default Button;
