import React, { useCallback, useRef, useState } from 'react';
import * as Yup from 'yup';

import { FiMail, FiArrowLeft } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import Image from 'next/image';
import {
  Container,
  Content,
  AnimationContainer,
} from '@/styles/pages/ForgotPassword';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { BackGround, Logo } from '@/styles/SingnIn/styles';
import Input from '../components/Input';
import Button from '../components/Button';
import getValidationErros from '../utils/getValidationErros';
import api from '../services/api';
import { useToast } from '../hooks/modules/ToastContext';

const ForgotPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const router = useRouter();
  const { addToast } = useToast();

  const [loading, setLoading] = useState(0);

  const hanleSingnUp = useCallback(
    async (data: { email: string }) => {
      try {
        setLoading(1);
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail valido.'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });
        const { email } = data;

        await api.post('/password/forgot', {
          email,
        });

        addToast({
          type: 'success',
          title: 'E-mail de recuperação enviado.',
          description:
            'Enviamos um e-amil para cofirmar a recuperação de senha.',
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
          title: 'Erro ao enviar E-mail!',
          description: 'Verifique os dados e tente novamente.',
        });
      } finally {
        setLoading(0);
      }
    },
    [addToast, router],
  );

  return (
    <Container>
      <BackGround>
        <Image src="/Logo.png" alt="Chat PI" width={620} height={600} />
      </BackGround>
      <Content>
        <AnimationContainer>
          <Form ref={formRef} onSubmit={hanleSingnUp}>
            <Logo>
              <Image src="/Logo.png" alt="Chat PI" width={165} height={160} />
            </Logo>
            <h1>Recuperar senha</h1>

            <Input placeholder="E-mail" name="email" icon={FiMail} />

            <Button loading={loading} type="submit">
              Recuperar
            </Button>
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

export default ForgotPassword;
