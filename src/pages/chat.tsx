import ChatList from '@/components/ChatList';
import { useAuth } from '@/hooks/modules/AuthContext';
import { useToast } from '@/hooks/modules/ToastContext';
import api from '@/services/api';
import { Chat, Messages, InputMessage, HeaderChat } from '@/styles/Chat/styles';
import Image from 'next/image';
import React, {
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import io from 'socket.io-client';
import { Container } from '../styles/SingnIn/styles';

export default function ChatHome() {
  const { user } = useAuth();
  const { addToast } = useToast();

  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');
  const [inputFocus, setInputFocus] = useState(false);
  const [chatActivity, setChatActivity] = useState(null);

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
    return io(process.env.NEXT_PUBLIC_API_KEY, {
      query: { user: user?.id },
    });
  }, [user]);

  useEffect(() => {
    socket.on('message', messageSocket => {
      setMessages(oldMessages => [...oldMessages, messageSocket]);
    });
  }, [socket]);

  const sendMessage = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      socket.emit('message', message);
      setMessage('');
    },
    [socket, message],
  );

  return (
    <Container>
      <ChatList
        chatActivity={chatActivity}
        setChatActivity={setChatActivity}
        users={users}
      />
      <Chat>
        {chatActivity && (
          <HeaderChat>
            <p>{chatActivity.name}</p>
            {chatActivity.avatar_url && (
              <img
                src={chatActivity.avatar_url}
                alt={chatActivity.name}
                width="40"
                height="40"
              />
            )}
          </HeaderChat>
        )}
        <Messages>
          {messages.map(m => (
            <p>{m}</p>
          ))}
        </Messages>
        <form onSubmit={sendMessage}>
          <InputMessage focused={inputFocus}>
            <input
              onFocus={e => setInputFocus(e.nativeEvent.returnValue)}
              onBlur={() => setInputFocus(false)}
              value={message}
              onChange={text => setMessage(text.target.value)}
            />
            <button type="submit">Enviar</button>
          </InputMessage>
        </form>
      </Chat>
    </Container>
  );
}
