import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { useRouter } from 'next/router';
import io from 'socket.io-client';
import Image from 'next/image';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import Link from 'next/link';
import {
  Container,
  Content,
  Background,
  AnimationContainer,
} from '../styles/SingnIn/styles';
import Input from '../components/Input';
import Button from '../components/Button';
import getValidationErros from '../utils/getValidationErros';
import { useAuth } from '../hooks/modules/AuthContext';
import { useToast } from '../hooks/modules/ToastContext';

export default function SingnIn() {
  const formRef = useRef<FormHandles>(null);
  const router = useRouter();

  const { signIn } = useAuth();
  const { addToast } = useToast();

  const hanleSingnIn = useCallback(
    async (data: { email: string; password: string }) => {
      try {
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

        addToast({
          type: 'success',
          title: 'logado com sucesso',
        });
        router.push('chat');
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
      }
    },
    [signIn, addToast, router],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <Image src="/Logo.png" alt="Gobarber" width="230" height="134" />

          <Form ref={formRef} onSubmit={hanleSingnIn}>
            <h1>Faça seu logon</h1>

            <Input placeholder="E-mail" icon={FiMail} name="email" />
            <Input
              placeholder="Senha"
              type="password"
              icon={FiLock}
              name="password"
            />

            <Button type="submit">Entrar</Button>
            <Link href="forgot_password">
              <a>Esqueci minha senha</a>
            </Link>
          </Form>
          <Link href="signup">
            <a>
              <FiLogIn />
              Criar conta
            </a>
          </Link>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
}
