import Image from 'next/image';
import React from 'react';
import SEO from '../Seo';

import { Container, Logo } from './styles';

const LoadingPage: React.FC = () => {
  return (
    <Container>
      <SEO title="ChatPI" shouldIndexPage={false} />
      <Logo>
        <Image src="/Logo.png" alt="Chat PI" width={165} height={160} />
      </Logo>
    </Container>
  );
};

export default LoadingPage;
