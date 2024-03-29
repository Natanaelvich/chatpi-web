import ChatList from '@/components/ChatList';
import { useAuth } from '@/hooks/modules/AuthContext';
import { AiOutlineSend } from 'react-icons/ai';
import { IoMdArrowBack } from 'react-icons/io';
import ModalImage from 'react-modal-image';
import {
  Chat,
  Messages,
  InputMessage,
  HeaderChat,
  Message,
  Header,
  HeaderContent,
  Profile,
  Background,
} from '@/styles/Chat/styles';
import React, { useEffect } from 'react';
import { FiPower } from 'react-icons/fi';
import Link from 'next/link';
import Seo from '@/components/Seo';
import withAuth from '@/utils/withAuth';
import { useChat } from '@/hooks/modules/ChatContext';
import api from '@/services/api';
import { Container, Wrapper } from '../styles/auth/styles';

export interface MessageProps {
  user: string | undefined;
  toUser: string;
  message: string;
  readed: boolean;
  id: string;
  date: Date;
  name?: string;
}

interface ChatHomeProps {
  Gobarberuser: string;
}

function ChatHome() {
  const { user, signOut } = useAuth();

  const {
    sendMessage,
    messages,
    message,
    inputFocus,
    chatActivity,
    usersLoggeds,
    typing,
    changeActivity,
    changeInputFocus,
    socket,
    changeMessage,
    changeAttedantes,
    changeUsers,
  } = useChat();

  useEffect(() => {
    async function getUsers() {
      try {
        const responseUser = await api.get('users');
        const responseAttendantes = await api.get('attendantes');

        changeUsers(responseUser.data);
        changeAttedantes(responseAttendantes.data);
      } catch (error) {
        console.log(error);
      }
    }

    getUsers();
  }, [changeUsers, changeAttedantes]);

  return (
    <Wrapper>
      <Seo
        title="Dashboard"
        description="Veja suas conversas e envia e receba mensagens"
        shouldIndexPage={false}
      />
      <Header chatShow={chatActivity}>
        <HeaderContent>
          <img src="/Logo.png" alt="Chat PI" width={80} height={77} />

          <Link href="profile">
            <Profile>
              <img
                src={user?.avatar_url || 'profile_avatar_placeholder.png'}
                alt={user?.name}
              />
              <div>
                <span>Bem-vindo,</span>
                <a>
                  <strong>{user?.name}</strong>
                </a>
              </div>
            </Profile>
          </Link>

          <button type="button" aria-label="Sair" onClick={signOut}>
            <FiPower color="#fff" size={21} />
          </button>
        </HeaderContent>
      </Header>
      <Container>
        <ChatList chatShow={chatActivity} />
        {chatActivity ? (
          <Chat>
            <HeaderChat>
              <button type="button" onClick={() => changeActivity(null)}>
                <IoMdArrowBack size={21} color="#fff" />
              </button>

              <section>
                <div>
                  <p>{chatActivity.name}</p>
                  {usersLoggeds && usersLoggeds[chatActivity?.id] && (
                    <small>Online</small>
                  )}
                </div>
                <ModalImage
                  small={
                    chatActivity?.avatar_url || 'profile_avatar_placeholder.png'
                  }
                  large={
                    chatActivity?.avatar_url || 'profile_avatar_placeholder.png'
                  }
                  className="profile-image"
                  hideDownload
                  hideZoom
                />
              </section>
            </HeaderChat>

            <Messages>
              {typing && typing[chatActivity.id] && <small>Digitando...</small>}
              {messages
                .filter(
                  m =>
                    (m.toUser === chatActivity.id && m.user === user.id) ||
                    (m.toUser === user.id && m.user === chatActivity.id),
                )
                .reverse()
                .map((m, index) => (
                  <Message key={index} owner={user.id === m?.user}>
                    {m.message}
                  </Message>
                ))}
            </Messages>
            <form onSubmit={sendMessage}>
              <InputMessage focused={inputFocus}>
                <input
                  placeholder="Digite sua mensagem..."
                  onFocus={e => changeInputFocus(e.nativeEvent.returnValue)}
                  onBlur={() => {
                    changeInputFocus(false);
                    socket.emit(
                      'typingBlur',
                      JSON.stringify({
                        user: user.id,
                        typing: false,
                        toUser: chatActivity?.id,
                      }),
                    );
                  }}
                  value={message}
                  onChange={text => {
                    socket.emit(
                      'typing',
                      JSON.stringify({
                        user: user?.id,
                        typing: true,
                        toUser: chatActivity?.id,
                      }),
                    );
                    changeMessage(text.target.value);
                  }}
                />
                <button type="submit">
                  <AiOutlineSend size={28} color="#fff" />
                </button>
              </InputMessage>
            </form>
          </Chat>
        ) : (
          <Background>
            <p>Clique em um atendente para iniciar uma coversa 💬</p>
          </Background>
        )}
      </Container>
    </Wrapper>
  );
}

export default withAuth(ChatHome);
