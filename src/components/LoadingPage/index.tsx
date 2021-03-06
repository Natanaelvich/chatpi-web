import Image from 'next/image';
import React from 'react';

import { Container, Logo } from './styles';

const LoadingPage: React.FC = () => {
  return (
    <Container>
      <Logo>
        <img src="/Logo.png" alt="Chat PI" width={165} height={160} />
      </Logo>
    </Container>
  );
};

export default LoadingPage;
