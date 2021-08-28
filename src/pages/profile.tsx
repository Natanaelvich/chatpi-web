import React, { useCallback, useRef, ChangeEvent, useState } from 'react';
import { FiMail, FiUser, FiLock, FiCamera, FiArrowLeft } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { useRouter } from 'next/router';
import Link from 'next/link';
import Seo from '@/components/Seo';
import withAuth from '@/utils/withAuth';
import ModalImage from 'react-modal-image';
import api from '../services/api';

import { useToast } from '../hooks/modules/ToastContext';

import Input from '../components/Input';
import Button from '../components/Button';

import { Container, Content, AvatarInput } from '../styles/Profile/styles';
import { useAuth } from '../hooks/modules/AuthContext';
import getValidationErros from '../utils/getValidationErros';

interface ProfileProps {
  Gobarberuser: string;
}

interface ProfileFormData {
  name: string;
  email: string;
  old_password: string;
  password: string;
  password_confirmation: string;
}

function Profile() {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const router = useRouter();

  const [loading, setLoading] = useState(0);

  const [attendant, setAttendant] = useState(false);
  const [attendantType, setAttendantAtype] = useState('');

  const { user, updateUser } = useAuth();

  const handleSubmit = useCallback(
    async (data: ProfileFormData) => {
      try {
        setLoading(1);
        formRef.current?.setErrors({});

        if (attendant && !attendantType) {
          alert('Escolha um tipo de atendente');

          return;
        }

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          old_password: Yup.string(),
          password: Yup.string().when('old_password', {
            is: val => !!val.length,
            then: Yup.string().required('Campo obrigatório'),
            otherwise: Yup.string(),
          }),
          password_confirmation: Yup.string()
            .when('old_password', {
              is: val => !!val.length,
              then: Yup.string().required('Campo obrigatório'),
              otherwise: Yup.string(),
            })
            .oneOf([Yup.ref('password'), null], 'Confirmação incorreta'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const { name, email, old_password, password, password_confirmation } =
          data;

        const formData = {
          name,
          email,
          ...(old_password
            ? {
                old_password,
                password,
                password_confirmation,
              }
            : {}),
        };

        const response = await api.put('/profile/update', formData);

        updateUser(response.data);

        router.push('/chat');

        addToast({
          type: 'success',
          title: 'Perfil atualizado!',
          description:
            'Suas informações do perfil foram atualizadas com sucesso!',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErros(err);

          console.log(errors);
          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro na atualização',
          description: 'Ocorreu um erro ao atualizar perfil, tente novamente.',
        });
      } finally {
        setLoading(0);
      }
    },
    [addToast, router, updateUser, attendant, attendantType],
  );

  const handleAvatarChange = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const data = new FormData();

        data.append('avatar', e.target.files[0]);

        try {
          const response = await api.patch('/users/avatar', data);
          updateUser(response.data);

          addToast({
            type: 'success',
            title: 'Avatar atualizado!',
          });
        } catch (error) {
          addToast({
            type: 'error',
            title: 'Não foi possível atualizar seu avatar!',
          });
        }
      }
    },
    [addToast, updateUser],
  );

  return (
    <Container>
      <Seo title={user?.name || 'Perfil'} shouldIndexPage={false} />
      <header>
        <div>
          <Link href="/chat">
            <a>
              <FiArrowLeft />
            </a>
          </Link>
        </div>
      </header>
      <Content>
        <Form
          ref={formRef}
          initialData={{
            name: user?.name,
            email: user?.email,
          }}
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <AvatarInput
            bg={user?.avatar_url || 'profile_avatar_placeholder.png'}
          >
            <ModalImage
              small={user?.avatar_url}
              large={user?.avatar_url}
              alt={user.name}
              className="profile-image"
              hideDownload
              hideZoom
            />
            <label htmlFor="avatar">
              <FiCamera />

              <input type="file" id="avatar" onChange={handleAvatarChange} />
            </label>
          </AvatarInput>

          <h1>Meu perfil</h1>
          <Input name="name" icon={FiUser} placeholder="Nome" />
          <Input name="email" icon={FiMail} placeholder="E-mail" />

          <Input
            containerStyle={{ marginTop: 24 }}
            name="old_password"
            icon={FiLock}
            type="password"
            placeholder="Senha atual"
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
          />

          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Nova senha"
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
          />

          <Input
            name="password_confirmation"
            icon={FiLock}
            type="password"
            placeholder="Confirmar senha"
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
          />

          <div>
            <label htmlFor="attendant">
              Ser um atendente
              <input
                checked={attendant}
                onChange={e => setAttendant(e.target.checked)}
                type="checkbox"
                name="attendant"
              />
            </label>
          </div>

          {attendant && (
            <select
              onChange={e => setAttendantAtype(e.target.value)}
              value={attendantType}
              name="attendantType"
            >
              <option value="">Selecione um tipo</option>
              <option value="enf">Enfermeiro(a)</option>
              <option value="psic">Psicólogo(a)</option>
            </select>
          )}

          <Button loading={loading} type="submit">
            Confirmar mudanças
          </Button>
        </Form>
      </Content>
    </Container>
  );
}

export default withAuth(Profile);
