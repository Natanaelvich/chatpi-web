import ChatList from '@/components/ChatList';
import { useAuth } from '@/hooks/modules/AuthContext';
import { AiOutlineSend } from 'react-icons/ai';
import { IoMdArrowBack } from 'react-icons/io';
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
import React from 'react';
import { FiPower } from 'react-icons/fi';
import Link from 'next/link';
import Seo from '@/components/Seo';
import withAuth from '@/utils/withAuth';
import { useChat } from '@/hooks/modules/ChatContext';
import { urls } from '../constants';
import { Container, Wrapper } from '../styles/SingnIn/styles';

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
  } = useChat();

  return (
    <Wrapper>
      <Seo title="Dashboard" shouldIndexPage={false} />
      <Header chatShow={chatActivity}>
        <HeaderContent>
          <img src="/Logo.png" alt="Chat PI" width={80} height={77} />

          <Profile>
            <img
              src={
                user?.avatar_url ||
                `${urls[process.env.NODE_ENV]}/myAvatars/${user?.id}`
              }
              alt={user?.name}
            />
            <div>
              <span>Bem-vindo,</span>
              <Link href="profile">
                <a>
                  <strong>{user?.name}</strong>
                </a>
              </Link>
            </div>
          </Profile>

          <button type="button" onClick={signOut}>
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
                <img
                  src={
                    chatActivity?.avatar_url ||
                    `${urls[process.env.NODE_ENV]}/myAvatars/${chatActivity.id}`
                  }
                  alt={chatActivity.name}
                  width="40"
                  height="40"
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
