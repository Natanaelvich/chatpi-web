import React, { useCallback, useRef } from 'react';
import * as Yup from 'yup';

import { FiMail, FiUser, FiArrowLeft, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { BackGround, Logo } from '@/styles/SingnIn/styles';
import {
  Container,
  Content,
  AnimationContainer,
} from '../styles/SingnUp/styles';

import Input from '../components/Input';
import Button from '../components/Button';
import getValidationErros from '../utils/getValidationErros';
import api from '../services/api';
import { useToast } from '../hooks/modules/ToastContext';

const SingnUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const router = useRouter();
  const { addToast } = useToast();

  const hanleSingnUp = useCallback(
    async (data: { name: string; email: string; password: string }) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório.'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail valido.'),
          password: Yup.string().min(6, 'No minimo 6 digitos.'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });
        const { name, email, password } = data;

        await api.post('/users', {
          name,
          email,
          password,
        });

        addToast({
          type: 'success',
          title: 'Cadastrado com sucesso',
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
          title: 'Erro ao cadastrar',
          description: 'Ocorreu um erro no cadastro, tente novamente.',
        });
      }
    },
    [addToast, router],
  );

  return (
    <Container>
      <BackGround>
        <Image src="/Logo.png" alt="Chat PI" width={620} height={440} />
      </BackGround>
      <Content>
        <AnimationContainer>
          <Form ref={formRef} onSubmit={hanleSingnUp}>
            <Logo>
              <Image src="/Logo.png" alt="Chat PI" width={165} height={160} />
            </Logo>
            <h1>Faça seu cadatro</h1>

            <Input placeholder="Nome" name="name" icon={FiUser} />
            <Input placeholder="E-mail" name="email" icon={FiMail} />
            <Input
              placeholder="Senha"
              type="password"
              name="password"
              icon={FiLock}
            />

            <Button type="submit">Cadatrar</Button>
          </Form>
          <Link href="/">
            <a>
              <FiArrowLeft />
              Voltar para logon
            </a>
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default SingnUp;
