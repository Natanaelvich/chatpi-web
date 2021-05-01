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
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import io from 'socket.io-client';
import { FiPower } from 'react-icons/fi';
import Link from 'next/link';
import Seo from '@/components/Seo';
import withAuth from '@/utils/withAuth';
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
  const { addToast } = useToast();

  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [attendants, setAttendantes] = useState([]);
  const [message, setMessage] = useState('');
  const [inputFocus, setInputFocus] = useState(false);
  const [chatActivity, setChatActivity] = useState(null);
  const [usersLoggeds, setUsersLoggeds] = useState(null);
  const [typing, setTyping] = useState(null);

  useEffect(() => {
    async function getUsers() {
      try {
        const responseUser = await api.get('users');
        const responseAttendantes = await api.get('attendantes');

        setUsers(responseUser.data);
        setAttendantes(responseAttendantes.data);
      } catch (error) {
        console.log(error);
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
    if (typeof window !== 'undefined' && user) {
      const messagesStorage = localStorage.getItem(
        `@GoBarber:messages:${user.id}`,
      );
      if (messagesStorage) {
        setMessages(JSON.parse(messagesStorage));
      }
    }
  }, []);

  useEffect(() => {
    socket.on('messagesCache', (messagesCache: string) => {
      const messagesParse = JSON.parse(messagesCache);
      const messagesTemp = messagesParse.map(m => ({
        ...m,
        readed: false,
        id: m.user,
      }));
      setMessages(oldMessages => {
        if (typeof window !== 'undefined' && user) {
          localStorage.setItem(
            `@GoBarber:messages:${user.id}`,
            JSON.stringify([...oldMessages, ...messagesTemp]),
          );
        }

        return [...oldMessages, ...messagesTemp];
      });
    });
    socket.on('message', messageSocket => {
      const messageParse = JSON.parse(messageSocket);

      setMessages(oldMessages => {
        if (typeof window !== 'undefined' && user) {
          localStorage.setItem(
            `@GoBarber:messages:${user.id}`,
            JSON.stringify([
              ...oldMessages,
              {
                ...messageParse,
                // readed: chatActivity?.id
                //   ? chatActivity.id === messageParse.user
                //   : false,
                readed: false,
                id: messageParse.user,
              },
            ]),
          );
        }
        return [
          ...oldMessages,
          {
            ...messageParse,
            // readed: chatActivity?.id
            //   ? chatActivity.id === messageParse.user
            //   : false,
            readed: false,
            id: messageParse.user,
          },
        ];
      });
    });
    socket.on('usersLoggeds', usersLoggedsSocket => {
      setUsersLoggeds(JSON.parse(usersLoggedsSocket));
    });
    socket.on('typing', typingSocket => {
      setTyping(JSON.parse(typingSocket));
    });
  }, [socket, user]);

  const sendMessage = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      const messageTemp = {
        id: chatActivity.id,
        user: user?.id,
        toUser: chatActivity.id,
        message,
        readed: false,
        date: new Date(),
        name: user.name,
      };
      if (chatActivity) {
        socket.emit('message', JSON.stringify(messageTemp));
        setMessages(oldMessages => {
          if (typeof window !== 'undefined' && user) {
            localStorage.setItem(
              `@GoBarber:messages:${user.id}`,
              JSON.stringify([
                ...oldMessages,
                { ...messageTemp, readed: true },
              ]),
            );
          }
          return [...oldMessages, { ...messageTemp, readed: true }];
        });

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

  const getMessagesNoReadedsArray = useCallback(
    attendant => {
      const messagesUser = messages
        .filter(m => m.id === attendant.id)
        .filter(m => m.readed === false);
      return messagesUser;
    },
    [messages],
  );

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
        <ChatList
          chatShow={chatActivity}
          typing={typing}
          chatActivity={chatActivity}
          setChatActivity={setChatActivity}
          attendants={attendants}
          users={users}
          usersLoggeds={usersLoggeds}
          messages={messages}
          getLastMessage={getLastMessage}
          setMessages={setMessages}
          getMessagesNoReadedsArray={getMessagesNoReadedsArray}
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
                  onChange={text => {
                    socket.emit(
                      'typing',
                      JSON.stringify({
                        user: user?.id,
                        typing: true,
                        toUser: chatActivity?.id,
                      }),
                    );
                    setMessage(text.target.value);
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

// export const getServerSideProps: GetServerSideProps<ChatHomeProps> = async ({
//   req,
//   res,
// }) => {
//   const { GoBarbertoken, Gobarberuser } = req.cookies;

//   if (!GoBarbertoken) {
//     res.writeHead(302, { Location: '/' }).end();
//   }
//   return {
//     props: {
//       Gobarberuser,
//     },
//   };
// };
