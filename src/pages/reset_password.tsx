import React, { useCallback, useRef } from 'react';
import { FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import Image from 'next/image';
import { useRouter } from 'next/router';
import {
  Container,
  Content,
  AnimationContainer,
  BackGround,
  Logo,
} from '../styles/pages/ResetPassword';
import Input from '../components/Input';
import Button from '../components/Button';
import getValidationErros from '../utils/getValidationErros';
import { useToast } from '../hooks/modules/ToastContext';
import api from '../services/api';

const ResetPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const router = useRouter();

  const { addToast } = useToast();
  const { token } = router.query;

  const hanleSingnIn = useCallback(
    async (data: { confirm_password: string; password: string }) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          password: Yup.string().required('Senha obrigatória'),
          confirm_password: Yup.string().oneOf(
            [Yup.ref('password'), null],
            'As senhas não batem!',
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const { password, confirm_password } = data;

        if (!token) {
          throw new Error();
        }

        await api.post('/password/reset', {
          password,
          confirm_password,
          token,
        });

        addToast({
          type: 'success',
          title: 'Senha resetada',
        });

        router.push('/');
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErros(error);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro ao resetar senha',
          description: 'Ocorreu um erro ao resetar sua senha, tente novamente!',
        });
      }
    },
    [addToast, router, token],
  );
  return (
    <Container>
      <Content>
        <AnimationContainer>
          <Logo>
            <Image src="/Logo.png" alt="Chat PI" width={165} height={160} />
          </Logo>

          <Form ref={formRef} onSubmit={hanleSingnIn}>
            <h1>Resetar senha </h1>

            <Input
              placeholder="Senha"
              type="password"
              icon={FiLock}
              name="password"
            />

            <Input
              placeholder="Confirmar Senha"
              type="password"
              icon={FiLock}
              name="confirm_password"
            />

            <Button type="submit">Alterar senha</Button>
          </Form>
        </AnimationContainer>
      </Content>
      <BackGround>
        <Image src="/Logo.png" alt="Chat PI" width={620} height={600} />
      </BackGround>
    </Container>
  );
};

export default ResetPassword;
