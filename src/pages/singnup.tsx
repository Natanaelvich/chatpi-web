import React, { useCallback, useEffect, useRef, useState } from 'react';
import * as Yup from 'yup';

import { FiMail, FiUser, FiArrowLeft, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import {
  Background,
  Logo,
  Container,
  Content,
  AnimationContainer,
} from '@/styles/auth/styles';

import Input from '../components/Input';
import Button from '../components/Button';
import getValidationErros from '../utils/getValidationErros';
import api from '../services/api';
import { useToast } from '../hooks/modules/ToastContext';

const SingnUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const router = useRouter();
  const { addToast } = useToast();

  const [attendant, setAttendant] = useState(false);
  const [attendantType, setAttendantAtype] = useState('');

  useEffect(() => {
    if (attendant === false) {
      setAttendantAtype('');
    }
  }, [attendant]);

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
          clerk: attendantType !== '' ? attendantType : null,
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
    [addToast, router, attendantType],
  );

  return (
    <Container>
      <Content>
        <Background>
          <Image src="/Logo.png" alt="Chat PI" width={620} height={600} />
        </Background>
        <AnimationContainer>
          <Logo>
            <Image src="/Logo.png" alt="Chat PI" width={165} height={160} />
          </Logo>
          <Form ref={formRef} onSubmit={hanleSingnUp}>
            <h1>Faça seu cadatro</h1>

            <Input placeholder="Nome" name="name" icon={FiUser} />
            <Input placeholder="E-mail" name="email" icon={FiMail} />
            <Input
              placeholder="Senha"
              type="password"
              name="password"
              icon={FiLock}
            />

            <div>
              <label htmlFor="attendant">
                Atendente
                <input
                  checked={attendant}
                  onChange={e => setAttendant(e.target.checked)}
                  type="checkbox"
                  id="attendant"
                  name="attendant"
                />
              </label>
            </div>

            {attendant && (
              <select
                onChange={e => setAttendantAtype(e.target.value)}
                value={attendantType}
              >
                <option value="">Selecione um tipo</option>
                <option value="enf">Enfermeiro(a)</option>
                <option value="psic">Psicólogo(a)</option>
              </select>
            )}

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
