import React, { useCallback, useRef, useState } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import LoadingPage from '@/components/LoadingPage';
import Seo from '@/components/Seo';
import {
  Container,
  Content,
  BackGround,
  AnimationContainer,
  Logo,
} from '../styles/SingnIn/styles';
import Input from '../components/Input';
import Button from '../components/Button';
import getValidationErros from '../utils/getValidationErros';
import { useAuth } from '../hooks/modules/AuthContext';
import { useToast } from '../hooks/modules/ToastContext';

export default function SingnIn() {
  const formRef = useRef<FormHandles>(null);
  const router = useRouter();

  const { signIn, user } = useAuth();
  const { addToast } = useToast();

  const [loading, setLoading] = useState(0);

  const hanleSingnIn = useCallback(
    async (data: { email: string; password: string }) => {
      try {
        setLoading(1);
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail valido.'),
          password: Yup.string().required('Senha obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const { email, password } = data;

        await signIn({ email, password });
        router.push('/chat');
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErros(error);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro no login',
          description: 'Verifique suas credenciais',
        });
      } finally {
        setLoading(0);
      }
    },
    [signIn, addToast, router],
  );

  if (user) {
    if (typeof window !== 'undefined') {
      window.location.pathname = '/chat';
      return <LoadingPage />;
    }
  }

  return (
    <Container>
      <Seo
        title="Bem vindo"
        description="Projeto integrador ADS 4º período Unifacema 2020."
        shouldIndexPage
        image="Seo.png"
      />
      <Content>
        <AnimationContainer>
          <Form ref={formRef} onSubmit={hanleSingnIn}>
            <Logo>
              <Image src="/Logo.png" alt="Chat PI" width={165} height={160} />
            </Logo>
            <h1>Chat PI</h1>

            <Input placeholder="E-mail" icon={FiMail} name="email" />
            <Input
              placeholder="Senha"
              type="password"
              icon={FiLock}
              name="password"
            />

            <Button loading={loading} type="submit">
              Entrar
            </Button>
            <Link href="/forgot_password">
              <a>Esqueci minha senha</a>
            </Link>
          </Form>
          <Link href="/singnup">
            <a>
              <FiLogIn />
              Criar conta
            </a>
          </Link>
        </AnimationContainer>
      </Content>
      <BackGround>
        <Image src="/Logo.png" alt="Chat PI" width={620} height={600} />
      </BackGround>
    </Container>
  );
}
