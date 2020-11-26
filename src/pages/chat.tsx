import ChatList from '@/components/ChatList';
import { useAuth } from '@/hooks/modules/AuthContext';
import { useToast } from '@/hooks/modules/ToastContext';
import { AiOutlineSend } from 'react-icons/ai';
import api from '@/services/api';
import {
  Chat,
  Messages,
  InputMessage,
  HeaderChat,
  Message,
  MessageBox,
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
import { Container } from '../styles/SingnIn/styles';
import constants from '../constants';

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
    return io(constants.API_URL, {
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
      setTyping(typingSocket);
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
          }),
        );
        setMessages(oldMessages => [
          ...oldMessages,
          { user: user?.id, toUser: chatActivity.id, message, readed: false },
        ]);
        setMessage('');
      }
    },
    [socket, message, chatActivity, user],
  );

  function handleKeyPress(e: KeyboardEvent<HTMLInputElement>): void {
    if (e.which !== 13) {
      socket.emit('typing', { user: user.id, typing: true });
    }
  }
  return (
    <Container>
      <ChatList
        typing={typing}
        chatActivity={chatActivity}
        setChatActivity={setChatActivity}
        users={users.filter(u => u.id !== user.id)}
        usersLoggeds={usersLoggeds}
      />
      {chatActivity && (
        <Chat>
          <HeaderChat>
            <p>{chatActivity.name}</p>
            <img
              src={`${constants.API_URL}/myAvatars/${chatActivity.id}`}
              alt={chatActivity.name}
              width="40"
              height="40"
            />
          </HeaderChat>

          <Messages>
            {messages
              .filter(
                m =>
                  (m.toUser === chatActivity.id && m.user === user.id) ||
                  (m.toUser === user.id && m.user === chatActivity.id),
              )
              .map(m => (
                <Message owner={user.id === m?.user}>{m.message}</Message>
              ))}
            {typing && typing[chatActivity.id] && <p>Digitando...</p>}
          </Messages>
          <form onSubmit={sendMessage}>
            <InputMessage focused={inputFocus}>
              <input
                onKeyPress={handleKeyPress}
                onFocus={e => setInputFocus(e.nativeEvent.returnValue)}
                onBlur={() => {
                  setInputFocus(false);
                  socket.emit('typingBlur', { user: user.id, typing: false });
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
      )}
    </Container>
  );
}
