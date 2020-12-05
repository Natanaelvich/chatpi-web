import ChatList from '@/components/ChatList';
import { useAuth } from '@/hooks/modules/AuthContext';
import { useToast } from '@/hooks/modules/ToastContext';
import { AiOutlineSend } from 'react-icons/ai';
import { IoMdArrowBack } from 'react-icons/io';
import api from '@/services/api';
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
import React, {
  FormEvent,
  KeyboardEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import io from 'socket.io-client';
import { FiPower } from 'react-icons/fi';
import Link from 'next/link';
import Image from 'next/image';
import { urls } from '../constants';
import { Container, Wrapper } from '../styles/SingnIn/styles';

export default function ChatHome() {
  const { user } = useAuth();
  const { addToast } = useToast();

  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');
  const [inputFocus, setInputFocus] = useState(false);
  const [chatActivity, setChatActivity] = useState(null);
  const [usersLoggeds, setUsersLoggeds] = useState(null);
  const [typing, setTyping] = useState(null);

  useEffect(() => {
    async function getUsers() {
      try {
        const response = await api.get('users');

        setUsers(response.data);
      } catch (error) {
        addToast({
          type: 'error',
          title: 'Erro ao buscar usuarios',
          description: 'Tente novamente mais tarde',
        });
      }
    }

    getUsers();
  }, [addToast]);

  const socket = useMemo(() => {
    return io(urls[process.env.NODE_ENV], {
      query: { user: user?.id },
    });
  }, [user]);

  useEffect(() => {
    socket.on('message', messageSocket => {
      const messageParse = JSON.parse(messageSocket);
      setMessages(oldMessages => [...oldMessages, messageParse]);
    });
    socket.on('usersLoggeds', usersLoggedsSocket => {
      setUsersLoggeds(JSON.parse(usersLoggedsSocket));
    });
    socket.on('typing', typingSocket => {
      setTyping(JSON.parse(typingSocket));
    });
  }, [socket]);

  const sendMessage = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      if (chatActivity) {
        socket.emit(
          'message',
          JSON.stringify({
            user: user?.id,
            toUser: chatActivity.id,
            message,
            readed: false,
            date: new Date(),
            name: user.name,
          }),
        );
        setMessages(oldMessages => [
          ...oldMessages,
          {
            user: user?.id,
            toUser: chatActivity.id,
            message,
            readed: true,
            date: new Date(),
            name: user.name,
          },
        ]);
        setMessage('');
      }
    },
    [socket, message, chatActivity, user],
  );

  const getLastMessage = useCallback(
    attendant => {
      const messagesUser = messages.filter(
        m =>
          (m.user === attendant.id && m.toUser === user?.id) ||
          (m.user === user?.id && m.toUser === attendant.id),
      );
      if (messagesUser.length > 0) {
        return messagesUser[messagesUser.length - 1].message;
      }
      return null;
    },
    [messages, user],
  );

  function handleKeyPress(e: KeyboardEvent<HTMLInputElement>): void {
    if (e.which !== 13) {
      socket.emit(
        'typing',
        JSON.stringify({
          user: user?.id,
          typing: true,
          toUser: chatActivity?.id,
        }),
      );
    }
  }

  return (
    <Wrapper>
      <Header chatShow={chatActivity}>
        <HeaderContent>
          <Image src="/Logo.png" alt="Chat PI" width={80} height={77} />

          <Profile>
            <img
              src={`${urls[process.env.NODE_ENV]}/myAvatars/${user?.id}`}
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

          <Link href="/">
            <a>
              <FiPower color="#fff" />
            </a>
          </Link>
        </HeaderContent>
      </Header>
      <Container>
        <ChatList
          chatShow={chatActivity}
          typing={typing}
          chatActivity={chatActivity}
          setChatActivity={setChatActivity}
          users={users.filter(u => u.id !== user.id)}
          usersLoggeds={usersLoggeds}
          getLastMessage={getLastMessage}
        />
        {chatActivity ? (
          <Chat>
            <HeaderChat>
              <button type="button" onClick={() => setChatActivity(null)}>
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
                  src={`${urls[process.env.NODE_ENV]}/myAvatars/${
                    chatActivity.id
                  }`}
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
                  onKeyPress={handleKeyPress}
                  onFocus={e => setInputFocus(e.nativeEvent.returnValue)}
                  onBlur={() => {
                    setInputFocus(false);
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
                  onChange={text => setMessage(text.target.value)}
                />
                <button type="submit">
                  <AiOutlineSend size={28} color="#fff" />
                </button>
              </InputMessage>
            </form>
          </Chat>
        ) : (
          <Background>
            <p>Clique em um usuario para iniciar uma coversa </p>
          </Background>
        )}
      </Container>
    </Wrapper>
  );
}
